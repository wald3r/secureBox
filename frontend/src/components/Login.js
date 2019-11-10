import React, { useState } from 'react'
import loginService from '../services/login'
import fileService from '../services/files'
import { setUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const Login = ( props ) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login with: ', username, password)
    const newUser = await loginService.login({ username, password })
    if(newUser !== undefined){
      props.setUser(newUser)
      fileService.setToken(newUser.token)
      props.handleNotification('Login successfull!', 5000)
    }else{
      props.handleError('Login failed!', 5000)
    }
    setPassword('')
    setUsername('')
  }


  return (

    <div>
      <Form onSubmit={handleLogin}>
        <table className='table .table-striped' width="10">
            <thead className='thead-dark'>

            </thead>
            <tbody width="10">
                <tr>
                    <td width="10">
                        Username:
                    </td>

                    <td>
                      <input onChange={({ target }) => setUsername(target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td width="10">
                        Password:
                    </td>

                    <td>
                      <input type='password' onChange={({ target }) => setPassword(target.value)}/>
                    </td>
                </tr>
            </tbody>
        </table>
        <Button type="submit">login</Button>
      </Form>
    </div>
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