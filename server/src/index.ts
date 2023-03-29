import express, { Application, Request, Response, NextFunction } from 'express'
import routes from './routes'

// Import the connection wherever you needed (done here for testing)
import AppDataSource from './db/appDataSource'
// console.log(AppDataSource)
AppDataSource // Not a function call, just... don't know what's that?!

const app: Application = express()

app.use(express.json()) // middleware for parsing JSON data

app.use('/api', routes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send(`hello world`)
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
