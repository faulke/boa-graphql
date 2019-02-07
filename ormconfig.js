const isDev = process.env.STAGE !== 'prod'

if (isDev) {
  require('dotenv').config()
}

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrationsTablename: 'migrations',
  migrations: [`${process.env.BASE_DIR}/migrations/*.js`],
  entities: isDev
    ? [`${process.env.BASE_DIR}/entities/*.ts`]
    : [`${process.env.BASE_DIR}/entities/*.js`],
  cli: {
    migrationsDir: 'src/migrations'
  },
  logger: isDev && 'advanced-console',
  logging: isDev && 'all',
  cache: true
}
