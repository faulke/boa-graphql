import * as express from 'express'

async function bootstrap () {
  const app = express()
  const PORT = 3000
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}

bootstrap()
