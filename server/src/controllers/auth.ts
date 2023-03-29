import { RequestHandler } from 'express'
import { RegisterValidation } from '../validation/register'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'
import bcrypt from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

export const Register: RequestHandler = async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  // validate the user input
  const { error } = RegisterValidation.validate(req.body)

  const userRepository = AppDataSource.getRepository(User)
  const hashedPassword = await bcrypt.hash(password, 10)

  const { password: pwd, ...user } = await userRepository.save({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  })

  return error ? res.status(400).json({ error: error }) : res.status(200).json({ message: user })
}

export const LogIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // fetch the user from db
  const user = await userRepository.findOneBy({ email: email })

  if (!user) return res.status(404).json({ message: 'invalid credentials' })

  // Compare the plaintext password with the hashed one in the database.
  const match = await bcrypt.compare(password, user.password)

  const payload = {
    id: user.id,
  }
  const token = sign(payload, 'secret') // let's keep secret simple for now.
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  // Extract the password before sending the user (sensitive information)
  const { password: pwd, ...userNoPassword } = user

  if (match === true)
    return res.status(200).json({
      message: 'success',
      user: userNoPassword,
      // token: jwt // send in httpOnly cookie
    })
  else return res.status(400).json({ message: 'invalid credentials' })
}

export const AuthenticatedUser: RequestHandler = async (req, res) => {
  // Thanks to cookie-parser we can access the jwt in the cookie sent by the user.
  const { jwt } = req.cookies

  if (!jwt)
    return res.status(401).json({ message: 'unauthenticated'})

  try {
    const payload: any = verify(jwt, 'secret')
  
    if (!payload) return res.status(401).json({ message: 'unauthenticated' })
  
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: payload.id })

    if (user) {
      const { password: pwd, ...userNoPassword } = user
      res.status(200).json({ user: userNoPassword })
    }
  } catch (error) {
    return res.status(401).json({ message: 'unauthenticated' })
  }
}

export const LogOut: RequestHandler = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    maxAge: 0, // Expired
  })

  return res.status(200).json({ message: 'success' })
}
