import * as lambdaExpress from 'aws-serverless-express'
import { Handler, Context } from 'aws-lambda'
import app from './app'

const server = lambdaExpress.createServer(app)

function hello (event: any, context: Context) {
  return lambdaExpress.proxy(server, event, context)
}

export { hello }
