import { Client } from 'pg'

async function handler (event: any) {
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
  const user = res.rows[0]
  await client.end()

  if (user) {
    console.log('DEBUG: logging in user', user.id)

    const response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          userId: user.id
        }
      }
    }

    event.response = response
  }

  return event
}

export { handler }
