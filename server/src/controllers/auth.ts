import { RequestHandler } from 'express'

export const Register: RequestHandler = (req, res) => {
  return res.send(req.body)
}
