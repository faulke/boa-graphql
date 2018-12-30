import * as TypeORM from 'typeorm'
import * as TypeGraphql from 'type-graphql'
import { createConnection } from 'typeorm'
import { Container } from 'typedi'

async function connect() {
  TypeGraphql.useContainer(Container)
  TypeORM.useContainer(Container)

  await createConnection()
}

export default connect
