import { RequestHandler } from 'express'
import { RegisterValidation } from '../validation/register'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'
import bcrypt from 'bcrypt'

export const Register: RequestHandler = async (req, res) => {
  const {first_name, last_name, email, password } = req.body

  // validate the user input
  const { error } = RegisterValidation.validate(req.body)

  const userRepository = AppDataSource.getRepository(User)
  const hashedPassword = await bcrypt.hash(password, 10)

  const { password: pwd, ...user } = await userRepository.save({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword
  })

  return error ? res.status(400).json({ error: error }) : res.status(200).json({ message: user })
}

export const Login: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // fetch the user from db
  const user = await userRepository.findOneBy({ email: email })

  if (!user)
    return res.status(404).json({ message: 'invalid credentials' })

  const match = await bcrypt.compare(password, user.password)

  const { password: pwd, ...userNoPassword} = user

  if (match === true) return res.status(200).json({
    message: 'wooohoo',
    user: userNoPassword
  })
  else return res.status(400).json({ message: 'invalid credentials' })
}
