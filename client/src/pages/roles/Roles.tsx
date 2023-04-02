import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'

const Roles = () => {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get('/roles')
      setRoles(response.data.roles)
    })()
  }, [])

  async function onDelete(id: number) {
    if (window.confirm('You sure you wanna delete this role?')) {
      await axios.delete(`/roles/${id}`)
      setRoles((prev) => prev.filter((r: Role) => r.id !== id))
    }
  }

  return (
    <Wrapper>
      <div className='pt-3 pb-2 mb-3 border-bottom'>
        <Link to='/roles/create' className='btn btn-sm btn-outline-secondary'>
          Add Role
        </Link>
      </div>

      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 &&
              roles.map((r: Role) => {
                return (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>
                      <div className='btn-group mr-2'>
                        <Link
                          to={`/roles/${r.id}/edit`}
                          state={r}
                          className='btn btn-sm btn-outline-secondary'
                        >
                          Edit
                        </Link>
                        <a
                          href='#'
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => onDelete(r.id)}
                        >
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default Roles
