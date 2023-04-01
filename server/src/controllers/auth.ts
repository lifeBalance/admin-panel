import { RequestHandler } from 'express'
import { RegisterValidation, UpdatePasswordValidation } from '../validation/register'
import AppDataSource from '../db/appDataSource'
import { User } from '../entity/user'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

export const Register: RequestHandler = async (req, res) => {
  const { first_name, last_name, email, password, password_confirm } = req.body

  // validate the user input
  const { error } = RegisterValidation.validate({
    first_name,
    last_name,
    email,
    password,
    password_confirm,
  })
  console.log('error registering?', error);
  

  const userRepository = AppDataSource.getRepository(User)
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userRepository.findOneBy({ email: email })
  if (user) return res.status(404).json({ message: 'email already exists' })

  const { password: pwd, ...userWithoutPassword } = await userRepository.save({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  })

  return error
    ? res.status(400).json({ error: error })
    : res.status(200).json({ message: userWithoutPassword })
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
  // console.log(process.env.SECRET_KEY) // testing
  const token = sign(payload, process.env.SECRET_KEY!)

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

// export const AuthenticatedUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
export const AuthenticatedUser: RequestHandler = async (req, res, next) => {
  const { password, ...user } = req.user
  // console.log(user) // check the password is not being sent!
  res.status(200).json({ user: user })
}

export const LogOut: RequestHandler = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    maxAge: 0, // Expired
  })

  return res.status(200).json({ message: 'success' })
}

export const UpdateInfo: RequestHandler = async (req, res) => {
  const { id: uid } = req.user // uid: id of the user to be updated (in jwt)
  const { first_name, last_name, email } = req.body // New user intel
  console.log('updating user', uid, 'with:', first_name, last_name, email)

  // setup the query
  const userRepository = AppDataSource.getRepository(User)
  // update the user in the db
  const result = await userRepository.update(uid, {
    first_name,
    last_name,
    email,
  })
  // console.log('update returns', result) // checking what the query returns..

  /* The queries don't return anything useful, so we gotta fetch the user. */
  const foundUser = await userRepository.findOneBy({ id: uid })
  if (foundUser) {
    const { password, ...userWithoutPassword } = foundUser
    return res.status(200).json({ user: userWithoutPassword })
  }

  res.status(400).json({ message: 'bad request' })
}

export const UpdatePassword: RequestHandler = async (req, res) => {
  const { id: uid } = req.user // uid: id of the user to be updated (in jwt)
  const { password, password_confirm } = req.body // New user password
  console.log('updating user', uid, 'with pwd:', password, password_confirm)

  // validate the user password
  const { error } = UpdatePasswordValidation.validate({ password, password_confirm })
  if (error) return res.status(400).json({ message: error.message })

  // Another way of updating a row (createQueryBuilder)
  const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({ password: await bcrypt.hash(password, 10) })
    .where('id = :id', { id: uid })
    .execute()
  console.log('update returns', result) // checking what the query returns..

  const { password: pwd, ...userWithoutPassword } = req.user
  return res.status(200).json({ user: userWithoutPassword })
}
