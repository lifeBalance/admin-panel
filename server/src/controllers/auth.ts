import { RequestHandler } from 'express'
import { RegisterValidation } from '../validation/register'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'
import bcryptjs from 'bcryptjs'


export const Register: RequestHandler = async (req, res) => {
  const body = req.body

  // validate the user input
  const { error } = RegisterValidation.validate(body)
  
  const userRepository = AppDataSource.getRepository(User)
  const {password, ...user} = await userRepository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.email, 10)
  })

  return (error) ?
    res.status(400).json({ error: error })
    :
    res.status(200).json({ message: user })
}
