import express, { Router, Request } from 'express'
// import multer from 'multer'
// import { extname } from 'path'
import {
  Register,
  LogIn,
  LogOut,
  AuthenticatedUser,
  UpdateInfo,
  UpdatePassword,
} from './controllers/auth'
import { UploadImage } from './controllers/image'
import { GetOrders } from './controllers/order'
import { Permissions } from './controllers/permission'
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  GetProducts,
  UpdateProduct,
} from './controllers/product'
import { CreateRole, GetRoles, GetRole, UpdateRole, DeleteRole } from './controllers/role'

import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from './controllers/user'

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

router.get('/products', Auth, GetProducts)
router.post('/products', Auth, CreateProduct)
router.get('/products/:id', Auth, GetProduct)
router.put('/products/:id', Auth, UpdateProduct)
router.delete('/products/:id', Auth, DeleteProduct)

// type FileNameCallback = (error: Error | null, filename: string) => void
// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (_: Request, file: Express.Multer.File, callback: FileNameCallback) => {
  //     const randomName = Math.random().toString(20).substring(2, 12)
  
//     callback(null, `${randomName}${extname(file.originalname)}`)
//   },
// })
// router.post('/upload', Auth, multer({ storage }).single('image'), UploadImage)
router.post('/upload', Auth, UploadImage)
router.use('/uploads', express.static('./uploads'))

router.get('/orders', Auth, GetOrders)

export default router
