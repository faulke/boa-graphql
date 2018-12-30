import { ApolloServer } from 'apollo-server'
import schemaConfig from './apollo/schema'

const PORT = 3000

async function bootstrap () {
  const server = new ApolloServer(schemaConfig)
  const { url } = await server.listen(PORT)
  console.log(`Server running on at ${url}`)
}

bootstrap()
