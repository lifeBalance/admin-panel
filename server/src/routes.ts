import { Router } from 'express'
import {
  Register,
  LogIn,
  LogOut,
  AuthenticatedUser,
  UpdateInfo,
  UpdatePassword,
} from './controllers/auth'
import { Auth } from './middleware/auth'

const router = Router()

router.post('/register', Register)
router.post('/login', LogIn)
router.post('/logout', Auth, LogOut)
router.get('/user', Auth, AuthenticatedUser)
router.put('/users/info', Auth, UpdateInfo)
router.put('/users/password', Auth, UpdatePassword)

export default router
