import express, { Application, Request, Response, NextFunction } from 'express'

const app: Application = express()

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send(`hello world`)
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
