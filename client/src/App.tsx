import { useState } from 'react'
import Nav from './components/Nav'
import SideBar from './components/SideBar'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './pages/Users'

function App() {
  return (
    <div className='App'>
      <Nav />
      <BrowserRouter>
        <div className='container-fluid'>
          <div className='row'>
            <SideBar />
            <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
