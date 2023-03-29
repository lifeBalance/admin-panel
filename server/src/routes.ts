import { Router } from 'express'
import { Register, LogIn, LogOut, AuthenticatedUser } from './controllers/auth'
import { Auth } from './middleware/auth'

const router = Router()

router.post('/register', Register)
router.post('/login', LogIn)
router.post('/logout', Auth, LogOut)
router.get('/user', Auth, AuthenticatedUser)

export default router
