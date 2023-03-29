import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'
import { verify } from 'jsonwebtoken'

interface IDecodeUser {
  id: number,
  iat: number
}

export const Auth: RequestHandler = async (req, res, next) => {
  try {
    // Thanks to cookie-parser we can access the jwt in the cookie sent by the user.
    const { jwt } = req.cookies
    // If there's no jwt, verify will throw an error.
    const payload = <IDecodeUser>verify(jwt, process.env.SECRET_KEY!)
    
    // If there's no payload, we'll return.
    if (!payload) return res.status(401).json({ message: 'unauthenticated' })

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: payload.id })

    if (user)
      req.user = user // Check types/express to see what we did with the 'req' object
    next()
  } catch (error) {
    return res.status(401).json({ message: 'unauthenticated' })
  }
}
