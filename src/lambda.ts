import { ApolloServer } from 'apollo-server-lambda'
import schemaConfig from './apollo/schema'

const server = new ApolloServer(schemaConfig)
const handler = server.createHandler()

export { handler }
