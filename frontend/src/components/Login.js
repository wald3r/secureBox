import React, { useState } from 'react'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

const Login = ( props ) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login with: ', username, password)
    const newUser = await loginService.login({ username, password })
    if(newUser !== undefined){
      props.setUser(newUser)
      props.handleNotification('Login successfull!', 5000)
    }else{
      props.handleError('Login failed!', 5000)
    }
    setPassword('')
    setUsername('')
  }


  return (
    <form onSubmit={handleLogin}>
    <div>Username: <input onChange={({ target }) => setUsername(target.value)}/></div>
    <div>Password: <input onChange={({ target }) => setPassword(target.value)} /></div>
    <div><Button type="submit">Login</Button></div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  setUser,
  handleNotification,
  handleError
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)