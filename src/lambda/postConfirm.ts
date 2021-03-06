import { Client } from 'pg'

async function handler (event: any, context: any): Promise<any> {
  const { userName } = event
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
  const res = await client.query('insert into "user" (username, name, email) values ($1, $2, $3) returning *', [userName, 'test', email])
  const user = res.rows[0]
  console.log('DEBUG: Added user', user.id)
  await client.end()

  return event
}

export { handler }
