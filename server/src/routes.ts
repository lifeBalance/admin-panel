import { Router } from 'express'
import {
  Register,
  LogIn,
  LogOut,
  AuthenticatedUser,
  UpdateInfo,
  UpdatePassword,
} from './controllers/auth'
import { Permissions } from './controllers/permission'
import { CreateRole, GetRoles, GetRole, UpdateRole, DeleteRole } from './controllers/role'

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

router.get('/permissions', Auth, Permissions)

router.get('/roles', Auth, GetRoles)
router.post('/roles', Auth, CreateRole)
router.get('/roles/:id', Auth, GetRole)
router.put('/roles/:id', Auth, UpdateRole)
router.delete('/roles/:id', Auth, DeleteRole)

export default router
