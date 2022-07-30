import mysql from 'serverless-mysql'
import { env } from 'process'

const connection = mysql({
  config: {
    host: env.DB_HOST,
    port: 3306,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
})

export { connection }