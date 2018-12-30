import { gql } from 'apollo-server-lambda'
import { buildSchema } from 'type-graphql'

import { RecipeResolver } from  '../resolvers/recipe'

const createSchema = () => {
  return buildSchema({
    resolvers: [RecipeResolver]
  })
}

export default createSchema
