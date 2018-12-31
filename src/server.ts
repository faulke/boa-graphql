import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import createSchema from './apollo/createSchema'
import connect from './orm/connection'

const PORT = 3000

async function bootstrap () {
  await connect()
  const schema = await createSchema()
  const server = new ApolloServer({ schema })
  const { url } = await server.listen(PORT)
  console.log(`Server running on at ${url}graphql`)
}

bootstrap()
