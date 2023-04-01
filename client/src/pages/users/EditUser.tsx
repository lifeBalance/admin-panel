import axios, { AxiosError } from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import './CreateUser.css'
import { useNavigate, useLocation } from 'react-router-dom'

const EditUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [roleId, setRoleId] = useState<number>(1)
  const [roles, setRoles] = useState<Role[]>([])
  const navigate = useNavigate()

  const location = useLocation()
  console.log(location.state)

  useEffect(() => {
    (async () => {
      const response = await axios.get('/roles')
      console.log(response.data, response.data.length)
      setRoles(response.data.roles)
      setFirstName(location.state.first_name)
      setLastName(location.state.last_name)
      setEmail(location.state.email)
      setRoleId(location.state.role_id)
    })()
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    // console.log(firstName, lastName, email, roleId)
    // console.log(roles)
    try {
      const response = await axios.put(`/users/${location.state.id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
        role_id: roleId
      })
      // console.log(response)
      

      if (response.statusText === 'Accepted') {
        // Clear input fields
        setFirstName('')
        setLastName('')
        setEmail('')
        setRoleId(1)

        navigate('/users')
      }
    } catch (err) {
      const error = err as Error | AxiosError
      if (axios.isAxiosError(error)) {
        console.log(error.response)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Wrapper>
      <form onSubmit={onSubmit} className='form-create-user'>
        <h1 className='h3 mb-3 fw-normal'>Edit User</h1>

        <div className='form-floating'>
          <input
            type='text'
            value={firstName}
            className='form-control'
            id='firstName'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='firstName'>First Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            value={lastName}
            className='form-control'
            id='lastName'
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor='lastName'>Last Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='email'
            value={email}
            className='form-control'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
        </div>

        <div className='form-floating'>
          <select
            className='form-select'
            id='role'
            onChange={(e) => setRoleId(+e.target.value)}
            value={roleId}
          >
            {roles.length > 0 && roles.map((r: Role) => {
              return <option key={r.id} value={r.id}>{r.name}</option>
            })}
          </select>
          <label htmlFor='role'>Role</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default EditUser
