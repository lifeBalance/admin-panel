import express, { Application, Request, Response, NextFunction } from 'express'
import routes from './routes'
import cors from 'cors'

const app: Application = express()

app.use(express.json()) // middleware for parsing JSON data
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))

app.use('/api', routes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send(`hello world`)
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
