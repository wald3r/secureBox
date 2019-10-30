import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ handleUser }) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login with: ', username, password)
    const newUser = await loginService.login({ username, password })
    if(newUser !== undefined){
      handleUser(newUser)
      window.localStorage.setItem('loggedappUser', JSON.stringify(newUser))
    }
    setPassword('')
    setUsername('')
  }


  return (
    <form onSubmit={handleLogin}>
    <div>Username: <input onChange={({ target }) => setUsername(target.value)}/></div>
    <div>Password: <input onChange={({ target }) => setPassword(target.value)} /></div>
    <div><button type="submit">Login</button></div>
    </form>
  )
}

export default Login