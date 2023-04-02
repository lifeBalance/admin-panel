import axios, { AxiosError } from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import './CreateRole.css'
import { useNavigate } from 'react-router-dom'

const CreateRole = () => {
  const [roleName, setRoleName] = useState('')
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const response = await axios.get('/permissions')
      console.log(response.data, response.data.length)
      setPermissions(response.data.permissions)
    })()
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    console.log(permissions)
    // console.log(roles)
    try {
      const response = await axios.post('/roles', {
        name: roleName,
        permissions: selected
      })

      if (response.statusText === 'Created') {
        // Clear input fields
        setRoleName('')
        console.log(response)

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
        <h1 className='h3 mb-3 fw-normal'>Add New User</h1>

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

export default CreateRole
