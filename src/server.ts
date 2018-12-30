import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import * as path from 'path'

import createSchema from './apollo/schema'

const PORT = 3000

async function bootstrap () {
  const schema = await createSchema()
  const server = new ApolloServer({ schema })
  const { url } = await server.listen(PORT)
  console.log(`Server running on at ${url}`)
}

bootstrap()
