import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

import { RecipeResolver } from  '../resolvers/recipe'
import { UserResolver } from '../resolvers/user'

async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [
      RecipeResolver,
      UserResolver
    ]
  })

  return schema
}

export default createSchema
