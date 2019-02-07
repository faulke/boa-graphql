import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import jwt from 'jsonwebtoken'
import createSchema from './apollo/createSchema'
import connect from './orm/connection'

const PORT = 4000

async function bootstrap () {
  await connect()
  const schema = await createSchema()
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization

      if (token) {
        const { userId } = jwt.decode(token)
        return { userId }
      }
      
      return {}
    }
  })
  const { url } = await server.listen(PORT)
  console.log(`Server running at ${url}graphql`)
}

bootstrap()
