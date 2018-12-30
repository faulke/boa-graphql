import { gql } from 'apollo-server-lambda'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const schemaConfig = {
  typeDefs,
  resolvers
}

export default schemaConfig
