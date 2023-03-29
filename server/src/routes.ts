import { Router } from 'express'
import { Register, Login, AuthenticatedUser } from './controllers/auth'

const router = Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/user', AuthenticatedUser)

export default router
