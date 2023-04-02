import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Paginator from '../../components/Paginator'
import Wrapper from '../../components/Wrapper'

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(0)

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/users?page=${page}`)
      // console.log(response.data.users)
      // console.log(page)
      setUsers(response.data.users)
      setLastPage(response.data.meta.last_page)
    })()
  }, [page])

  async function onDelete(id: number) {
    if (window.confirm('You sure you wanna delete this user?')) {
      await axios.delete(`/users/${id}`)
      setUsers((prev) => prev.filter((u: User) => u.id !== id))
    }
  }

  return (
    <Wrapper>
      <div className='pt-3 pb-2 mb-3 border-bottom'>
        <Link to='/users/create' className='btn btn-sm btn-outline-secondary'>
          Add User
        </Link>
      </div>
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
            {users?.length &&
              users.map((u: User) => {
                return (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      {u.first_name} {u.last_name}
                    </td>
                    <td>{u.email}</td>
                    <td>{u?.role?.name || 'some role bruh'}</td>
                    <td>
                      <div className='btn-group mr-2'>
                        <Link
                          to={`/users/${u.id}/edit`}
                          state={u}
                          className='btn btn-sm btn-outline-secondary'
                        >
                          Edit
                        </Link>
                        <a
                          href='#'
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => onDelete(u.id)}
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

      <Paginator lastPage={lastPage} setPage={setPage} />
    </Wrapper>
  )
}

export default Users
