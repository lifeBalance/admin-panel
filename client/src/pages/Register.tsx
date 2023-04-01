import { FormEvent, useState } from 'react'
import './Register.css'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    console.log(firstName, lastName, email, password, confirmPassword);
  }

  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={onSubmit}>
        <h1 className='h3 mb-3 fw-normal'>Please Register</h1>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='firstName'
            onChange={e => setFirstName(e.target.value)}
          />
          <label htmlFor="firstName">First Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='lastName'
            onChange={e => setLastName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='email'
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className='form-floating'>
          <input
            type='password'
            autoComplete='on'
            className='form-control'
            id='password'
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className='form-floating'>
          <input
            type='password'
            autoComplete='on'
            className='form-control'
            id='confirmPassword'
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
        <p className='mt-5 mb-3 text-muted'>&copy; 2017–2022</p>
      </form>
    </main>
  )
}

export default Register
