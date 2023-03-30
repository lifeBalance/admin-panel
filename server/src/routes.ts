import { Router } from 'express'
import {
  Register,
  LogIn,
  LogOut,
  AuthenticatedUser,
  UpdateInfo,
  UpdatePassword,
} from './controllers/auth'

import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  Users,
} from './controllers/user'

import { Auth } from './middleware/auth'

const router = Router()

router.post('/register', Register)
router.post('/login', LogIn)
router.post('/logout', Auth, LogOut)
router.get('/user', Auth, AuthenticatedUser)
router.put('/users/info', Auth, UpdateInfo)
router.put('/users/password', Auth, UpdatePassword)
router.get('/users', Auth, Users)
router.post('/users', Auth, CreateUser)
router.get('/users/:id', Auth, GetUser)
router.put('/users/:id', Auth, UpdateUser)
router.delete('/users/:id', Auth, DeleteUser)

export default router
