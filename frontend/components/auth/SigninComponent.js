import Router from 'next/router'
import { useState, useEffect } from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: 'sa3333@naver.com',
    password: '123456',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  })

  const { email, password, error, loading, message, showForm } = values

  useEffect(() => {
    isAuth() && Router.replace('/')
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    // console.table({ email, password, error, loading, message, showForm })
    setValues({ ...values, loading: true, error: false })
    const user = { email, password }

    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        // TODO>> save user token to cookie
        // TODO>> save user info to localstorage
        // TODO>> authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) Router.push('/admin')
          else Router.push('/user')
        })
      }
    })
  }

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const showLoading = () =>
    loading ? <div className='alert alert-success'>Loading...</div> : ''

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : ''

  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : ''

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={email}
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            placeholder='Type your email'
          />
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            placeholder='Type your password'
          />
        </div>
        <div>
          <button className='btn btn-primary'>Signin</button>
        </div>
      </form>
    )
  }
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  )
}

export default SigninComponent
