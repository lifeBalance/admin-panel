import axios, { AxiosError } from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import './CreateRole.css'
import { useNavigate, useLocation } from 'react-router-dom'

const EditRole = () => {
  const [roleName, setRoleName] = useState('')
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const navigate = useNavigate()

  const location = useLocation()
  console.log('location.state',location.state)

  useEffect(() => {
    (async () => {
      // Set the name of the role (passed down in Link props)
      setRoleName(location.state.name)

      // Create all the checkboxes for the permissions.
      const response = await axios.get('/permissions')
      setPermissions(response.data.permissions)

      // Get the permissions for a given role.
      const { data } = await axios.get(`/roles/${location.state.id}`)

      // Set the selected state to the ids of the permissions
      setSelected(data.role.permissions.map((p: Permission) => +p.id))
    })()
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await axios.put(`/roles/${location.state.id}`, {
        name: roleName,
        permissions: selected
      })

      // console.log(response)
      if (response.statusText === 'Accepted') {
        // Clear input fields
        setRoleName('')
        // console.log(response)
        navigate('/roles')
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

  function handleCheckBox(id:number) {
    if (selected.some(val => val === id)) {
      setSelected(selected.filter(val => val !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  return (
    <Wrapper>
      <form onSubmit={onSubmit} className='form-create-role'>
        <h1 className='h3 mb-3 fw-normal'>Edit Role</h1>

        <div className='form-floating'>
          <input
            type='text'
            value={roleName}
            className='form-control'
            id='roleName'
            onChange={(e) => setRoleName(e.target.value)}
          />
          <label htmlFor='roleName'>Role Name</label>
        </div>

        <div className='form-floating'>
          {permissions.length > 0 &&
            permissions.map((p: Permission) => {
              return (
                <div className='form-check form-check-inline' key={p.id}>
                  <input
                    type='checkbox'
                    value={p.id}
                    checked={selected.includes(p.id) ? true : false}
                    className='form-check-input'
                    id='roleName'
                    onChange={() => handleCheckBox(p.id)}
                  />
                  <label className='form-check-label'>{p.name}</label>
                </div>
              )
            })}
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default EditRole
