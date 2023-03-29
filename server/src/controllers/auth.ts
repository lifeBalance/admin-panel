import { RequestHandler } from 'express'
import { RegisterValidation } from '../validation/register'

export const Register: RequestHandler = (req, res) => {
  const body = req.body
  const { error } = RegisterValidation.validate(body)
  return (error) ?
    res.status(400).json({ error: error })
    :
    res.status(200).json({ message: body })
}
