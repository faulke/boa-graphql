import * as TypeORM from 'typeorm'
import * as TypeGraphql from 'type-graphql'
import { createConnection } from 'typeorm'
import { Container } from 'typedi'

import { seedDatabase } from '../helpers'
import { Recipe } from '../entities/recipe'

async function connect() {
  TypeGraphql.useContainer(Container)
  TypeORM.useContainer(Container)

  await createConnection({
    type: 'postgres',
    database: 'boaguides',
    username: 'boa_graphql',
    password: 'password',
    port: 5432,
    entities: [
      Recipe
    ],
    synchronize: true,
    logger: "advanced-console",
    logging: "all"
  })

  await seedDatabase()
}

export default connect
