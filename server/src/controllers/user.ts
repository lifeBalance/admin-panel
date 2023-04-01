import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'
import { hash } from 'bcrypt'

export const Users: RequestHandler = async (req, res) => {
  const take = 3
  const page = req.query.page || '1'

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // fetch the list of products
  const [data, total] = await userRepository.findAndCount({
    take: take,
    skip: (+page - 1) * take,
    relations: ['role']
  })

  // Let's remove the passwords from the list of users.
  const users = data.map((u) => {
    const { password, ...user } = u
    return user
  })

  res.status(200).json({
    message: 'success',
    users: users,
    meta: {
      total,
      page: +page,
      last_page: Math.ceil(total / take),
    },
  })
}

export const CreateUser: RequestHandler = async (req, res) => {
  const { first_name, last_name, email, role_id } = req.body
  const defaultHashedPassword = await hash('1234', 10) // default password: 1234

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // update the user in the db
  const { password, ...userWithoutPassword } = await userRepository.save({
    first_name: first_name,
    last_name: last_name,
    email: email,
    role: { id: +role_id || 3 },
    password: defaultHashedPassword,
  })

  res.status(201).json({ message: 'success', user: userWithoutPassword })
}

export const GetUser: RequestHandler = async (req, res) => {
  const { id: uid } = req.params

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // find the user in the db
  const user = await userRepository.findOne({
    where: { id: +uid },
    relations: ['role'],
  })

  // If the user withthat id exists return it
  if (user) {
    const { password, ...userWithoutPassword } = user
    return res
      .status(200)
      .json({ message: 'success', user: userWithoutPassword })
  }
  // Otherwise return some feedback
  res.status(400).json({ message: 'user not found' })
}

export const UpdateUser: RequestHandler = async (req, res) => {
  const { id: uid } = req.params
  const { first_name, last_name, email, role_id } = req.body

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // update the user in the db
  const result = await userRepository.update(uid, {
    first_name,
    last_name,
    email,
    role: { id: role_id },
  })

  // If the user with that id was updated (she existed in the DB)
  if (result.affected === 1) {
    // The queries don't return the user, so we gotta fetch the user.
    const foundUser = await userRepository.findOne({
      where: { id: +uid },
      relations: ['role'],
    })

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      return res.status(202).json({ user: userWithoutPassword })
    }
  }
  // Otherwise return some feedback
  res.status(400).json({ message: 'user not found' })
}

export const DeleteUser: RequestHandler = async (req, res) => {
  const { id: uid } = req.params

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // update the user in the db
  const result = await userRepository.delete(uid)

  // If the user with that id was deleted (she existed in the DB)
  if (result.affected === 1) {
    return res.status(204).json(null)
  }
  // Otherwise return some feedback
  res.status(400).json({ message: 'user not found' })
}
