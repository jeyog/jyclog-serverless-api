import { createServer, proxy } from 'aws-serverless-express'
import { app } from './app'

const server = createServer(app)

export const main = (event, context) => { proxy(server, event, context) }
