import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const [user, setUser] = useState<User | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get('/user')
        setUser(response.data.user)
      } catch (error) {
        navigate('/login')
        console.log(error)
      }
    })()
  }, [])

  async function logOut() {
    try {
      const response = await axios.post('/logout', {})
      if (response.statusText === 'OK') {
        setUser(undefined)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
      <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6' href='#'>
        Company name
      </a>

      <ul className="my-2 my-md mr-md-3">
        {user &&
          <Link className='p-2 text-white text-decoration-none' to='/profile'>
          {user.first_name}
          </Link>}
        {user ?
          <Link className='p-2 text-white text-decoration-none' onClick={logOut} to=''>
          Log Out
          </Link>
          :
          <Link className='p-2 text-white text-decoration-none' onClick={logOut} to='/login'>
          Log In
          </Link>}
        {/* <a href="" className="p-2 text-white text-decoration-none">Sign out</a> */}
      </ul>
    </header>
  )
}

export default Nav
