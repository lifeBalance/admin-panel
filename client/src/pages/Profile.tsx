import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Wrapper from "../components/Wrapper"

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    (
      async () => {
        const response = await axios.get('/user')
        // console.log(response)
        if (response.statusText === 'OK') {
          setFirstName(response.data.user.first_name)
          setLastName(response.data.user.last_name)
          setEmail(response.data.user.email)
        }
      }
    )()
  }, [])

  async function infoSubmit(e: FormEvent) {
    e.preventDefault()

    const response = await axios.put('/users/info', {
      first_name: firstName,
      last_name: lastName,
      email: email
    })
    // console.log(response)
    if (response.statusText === 'OK')
      navigate('/')
  }

  async function passwordSubmit(e: FormEvent) {
    e.preventDefault()

    const response = await axios.put('/users/password', {
      password: password,
      password_confirm: passwordConfirm
    })
    // console.log(response)
    if (response.statusText === 'OK')
      navigate('/')

  }

  return (
    <Wrapper>
      <h3>Account information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label>email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}  onChange={e => setPassword(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input type="password" className="form-control" value={passwordConfirm}  onChange={e => setPasswordConfirm(e.target.value)}/>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  )
}

export default Profile