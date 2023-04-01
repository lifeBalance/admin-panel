import axios from 'axios'
import { ReactNode, useEffect,useState } from 'react'
import Nav from './Nav'
import SideBar from './SideBar'
import { useNavigate } from 'react-router-dom'

const Wrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      try {
        await axios.get('/user')
      } catch (error) {
        navigate('/login')
      }
    })()
  }, [])

  return (
    <>
      <Nav />
      <div className='container-fluid'>
        <div className='row'>
          <SideBar />
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Wrapper
