// import dotenv from 'dotenv'
// dotenv.config({ path: `${process.env.PWD}/.env` })
// lines above are for situations where the .env file is not in the root.
import 'dotenv/config'
console.log('PWD', process.env.PWD, 'SECRET_KEY', process.env.SECRET_KEY)

import express, { Application, Request, Response, NextFunction } from 'express'
import routes from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(express.json()) // middleware for parsing JSON data
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)
app.use(cookieParser())

app.use('/api', routes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send(`hello world`)
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
