import express, { Express, Request, Response } from 'express'
import { eventContext } from 'aws-serverless-express/middleware'

const app: Express = express()

app.use(eventContext())

app.get('/', (req: Request, res: Response) => {
    res.json(req.apiGateway.event)
})

app.get('/hello', (req: Request, res: Response) => {
    console.log(req)
    res.send('Hello World!!')
})

export { app }