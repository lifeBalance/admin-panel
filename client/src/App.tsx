import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Users from './pages/users/Users'
import CreateUser from './pages/users/CreateUser'
import EditUser from './pages/users/EditUser'
import Register from './pages/Register'
import Login from './pages/Login'
import Roles from './pages/roles/Roles'
import CreateRole from './pages/roles/CreateRole'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
