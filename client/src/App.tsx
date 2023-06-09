import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Users from './pages/users/Users'
import CreateUser from './pages/users/CreateUser'
import EditUser from './pages/users/EditUser'
import Register from './pages/Register'
import Login from './pages/Login'
import Roles from './pages/roles/Roles'
import CreateRole from './pages/roles/CreateRole'
import EditRole from './pages/roles/EditRole'
import Products from './pages/products/products'
import CreateProducts from './pages/products/CreateProducts'
import EditProduct from './pages/products/EditProduct'
import Orders from './pages/orders/Orders'
import Profile from './pages/Profile'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/create' element={<CreateUser />} />
          <Route path='/users/:id/edit' element={<EditUser />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/roles/create' element={<CreateRole />} />
          <Route path='/roles/:id/edit' element={<EditRole />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/create' element={<CreateProducts />} />
          <Route path='/products/:id/edit' element={<EditProduct />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
