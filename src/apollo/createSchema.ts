import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

import { RecipeResolver } from  '../resolvers/recipe'

async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [RecipeResolver]
  })

  return schema
}

export default createSchema
