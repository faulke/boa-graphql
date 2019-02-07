import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

import { RecipeResolver } from  '../resolvers/recipe'
import { UserResolver } from '../resolvers/user'
import { GuideResolver } from '../resolvers/guide'
import { TripResolver } from '../resolvers/trip'

async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [
      RecipeResolver,
      UserResolver,
      GuideResolver,
      TripResolver
    ]
  })

  return schema
}

export default createSchema
