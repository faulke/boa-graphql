import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import { Handler, Context, Callback } from 'aws-lambda'
import { getConnection } from 'typeorm'

import createSchema from '../apollo/createSchema'
import connect from '../orm/connection'

async function createHandler(): Promise<Handler> {
  // check for existing default connection pool
  try {
    getConnection()
  } catch (error) {
    await connect()
  }

  // check if schema already exists
  (global as any).schema = (global as any).schema || await createSchema()

  const schema = (global as any).schema
  const server = new ApolloServer({
    schema,
    context: ({ event, context }) => {
      console.log(event.requestContext)
    }
  })
  
  return server.createHandler()
}

const handler: Handler = (event: any, context: Context, callback: Callback) => {
  const callbackFilter = (error, output) => {
    const customOutput = output
    customOutput.headers['access-control-allow-origin'] = '*'
    callback(error, customOutput)
  }
  createHandler().then(handler => handler(event, context, callbackFilter))
}

export { handler }
