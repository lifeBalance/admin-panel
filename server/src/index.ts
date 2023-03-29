import express, { Application, Request, Response, NextFunction } from 'express'
import routes from './routes'

const app: Application = express()

app.use(express.json()) // middleware for parsing JSON data
// don't forget the cors middleware 😜

app.use('/api', routes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send(`hello world`)
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
