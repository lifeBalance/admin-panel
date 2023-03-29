import { Router } from 'express'
import { Register, LogIn, LogOut, AuthenticatedUser } from './controllers/auth'

const router = Router()

router.post('/register', Register)
router.post('/login', LogIn)
router.post('/logout', LogOut)
router.get('/user', AuthenticatedUser)

export default router
