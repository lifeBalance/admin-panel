import axios from 'axios'
import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'

const Users = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    (async () => {
      const response = await axios.get('/users')
      console.log(response.data.users)
      setUsers(response.data.users)
    })()
  }, [])

  return (
    <Wrapper>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.length && users.map((u: User) => {
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.email}</td>
                  <td>{u?.role?.name || 'some role bruh'}</td>
                  <td>Some action</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default Users
