import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import createSchema from './apollo/schema'

const createHandler = async () => {
  const schema = await createSchema()
  const server = new ApolloServer({
    schema
  })
  
  return server.createHandler()
}

const handler = (event, context, callback) => {
  createHandler().then(handler => handler(event, context, callback))
}

export { handler }
