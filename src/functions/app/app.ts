import express, { Express } from 'express'
import { eventContext } from 'aws-serverless-express/middleware'
import aboutRouter from './routes/abouts'

const app: Express = express()

app.use(eventContext())
app.use(express.json())
app.use('/abouts', aboutRouter)

export { app }