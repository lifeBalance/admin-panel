import axios from 'axios'
import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(0)

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/users?page=${page}`)
      // console.log(response.data.users)
      setUsers(response.data.users)
      setLastPage(response.data.meta.last_page)
    })()
  }, [page])

  function onNext() {
    setPage(prev => (prev + 1 <= lastPage) ? prev + 1 : lastPage)
  }

  function onPrevious() {
    setPage(prev => (prev - 1 > 0) ? prev - 1 : 1)
  }

  async function onDelete(id: number) {
    if (window.confirm('You sure you wanna delete this user?')) {
      await axios.delete(`/users/${id}`)
      setUsers(prev => prev.filter((u: User) => u.id !== id))
    }
  }

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
                  <td>
                    <div className="btn-group mr-2">
                      <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => onDelete(u.id)}>Delete</a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={onPrevious}>Previous</a>
          </li>

          <li className="page-item">
            <a href="#" className="page-link" onClick={() => onNext}>Next</a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  )
}

export default Users
