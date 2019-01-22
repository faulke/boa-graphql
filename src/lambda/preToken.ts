import { Context, Callback } from 'aws-lambda'
import { Client } from 'pg'

async function handler (event: any, context: Context) {
  const { email } = event.request.userAttributes
  const config = {
    user: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: 5432
  }
  const client = new Client(config)

  await client.connect()

  const res = await client.query('select id from "user" where email = $1', [ email ])
  const id = res.rows[0]
  console.log('DEBUG: loggin in user', id)

  await client.end()

  const response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        userId: id
      }
    }
  }

  event.response = response

  return event
}

export { handler }
