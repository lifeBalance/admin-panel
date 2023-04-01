import { FormEvent, useState } from 'react'
import './Register.css'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await axios.post('/login', {
        email,
        password
      })

      if (response.statusText === 'OK') {
        // Clear input fields
        setEmail('')
        setPassword('')
        console.log(response)

        navigate('/')
      }
    } catch (err) {
      const error = err as Error | AxiosError
      if(axios.isAxiosError(error)){
        console.log(error.response!.data)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={onSubmit}>
        <h1 className='h3 mb-3 fw-normal'>Please Log in</h1>

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
          <input
            type='password'
            value={password}
            autoComplete='on'
            className='form-control'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
        <p className='mt-5 mb-3 text-muted'>&copy; 2017–2022</p>
      </form>
    </main>
  )
}

export default Login
