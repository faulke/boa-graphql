import { Client } from 'pg'

async function handler (event: any, context: any): Promise<any> {
  console.log(event)
  const config = {
    user: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: 5432
  }

  const client = new Client(config)
  await client.connect()
  await client.end()

  return {
    statusCode: 200,
    body: 'User added!'
  }
}

export { handler }
