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
import { Chart, ExportOrders, GetOrders } from './controllers/order'
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
import { Permission } from './middleware/permission'

const router = Router()

router.post('/register', Register)
router.post('/login', LogIn)
router.post('/logout', Auth, LogOut)
router.get('/user', Auth, AuthenticatedUser)
router.put('/users/info', Auth, UpdateInfo)
router.put('/users/password', Auth, UpdatePassword)

router.get('/users', Auth, Permission('users'), Users)
router.post('/users', Auth, Permission('users'), CreateUser)
router.get('/users/:id', Auth, Permission('users'), GetUser)
router.put('/users/:id', Auth, Permission('users'), UpdateUser)
router.delete('/users/:id', Auth, Permission('users'), DeleteUser)

router.get('/permissions', Auth, Permissions)

router.get('/roles', Auth, Permission('roles'), GetRoles)
router.post('/roles', Auth, Permission('roles'), CreateRole)
router.get('/roles/:id', Auth, Permission('roles'), GetRole)
router.put('/roles/:id', Auth, Permission('roles'), UpdateRole)
router.delete('/roles/:id', Auth, Permission('roles'), DeleteRole)

router.get('/products', Auth, Permission('products'), GetProducts)
router.post('/products', Auth, Permission('products'), CreateProduct)
router.get('/products/:id', Auth, Permission('products'), GetProduct)
router.put('/products/:id', Auth, Permission('products'), UpdateProduct)
router.delete('/products/:id', Auth, Permission('products'), DeleteProduct)

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
router.post('/export', Auth, ExportOrders)
router.get('/chart', Auth, Chart)

export default router
