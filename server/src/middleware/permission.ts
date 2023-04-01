import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'

export const Permission = (access: string): RequestHandler => {
  return async (req, res, next) => {
    const authenticatedUser: User = req.user
    // console.log(authenticatedUser)
    const permissions = (authenticatedUser?.role) ? authenticatedUser.role.permissions : []

    if (req.method === 'GET' && permissions.length) {
      if (!permissions.some(p => p.name === `view_${access}` || p.name === `edit_${access}`)) {
        return res.status(401).json({ message: 'unauthorized'})
      }
    } else {
      if (permissions.length && !permissions.some(p => p.name === `edit_${access}`)) {
        return res.status(401).json({ message: 'unauthorized'})
      }
    }
    next()
  }
}
