import { Context, Callback } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import request from 'request-promise'

const userpoolId = 'us-west-2_wTdByAbLQ'
const appClientId = '4tt4rtak6vk4l0epskcg1ra6cd'
const region = 'us-west-2'
const keysUrl = `https://cognito-idp.${region}.amazonaws.com/${userpoolId}/.well-known/jwks.json`

async function handler (event: any, context: Context, callback: Callback) {
  const token = event.authorizationToken
  const response = {
    principalId: 'user1',
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: 'Allow',
        Resource: 'arn:aws:execute-api:us-west-2:580022145584:o84l26plo2/*/POST/graphql'
      }
    ],
    context: {
      token: null
    }
  }

  if (!token) {
    return callback(null, JSON.stringify(response))
  }

  const { header } = jwt.decode(token, { complete: true })
  const kid = header.kid

  // fetch jwk from amazon
  const { keys } = await request({ url: keysUrl, json: true })

  // find appropriate key
  let keyIndex = -1

  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i].kid === kid) {
      keyIndex = i
      break
    }
  }

  if (keyIndex === -1) {
    return callback('No matching key found.')
  }

  // convert key to pem
  const pem = jwkToPem(keys[keyIndex])

  // verify jwt w/ pem
  let verified

  try {
    verified = jwt.verify(token, pem)
  } catch (error) {
    return callback('Could not verify token.')
  }

  // check audience
  if (verified.aud !== appClientId) {
    return callback('Audience doesn\'t match.')
  }

  // check expired
  const current = Math.floor(+new Date() / 1000)
  if (current > verified.exp) {
    return callback('Token is expired.')
  }

  response.context.token = token
  
  return callback(null, JSON.stringify(response))
}

export { handler }
