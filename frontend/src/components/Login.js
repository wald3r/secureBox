import React, { useState } from 'react'
import loginService from '../services/login'
import fileService from '../services/files'
import { setUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'
import { getFiles } from '../reducers/filesReducer'
import { handleError } from '../reducers/errorReducer'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import '../stylesheets/general.css'
import parameter from '../utils/parameter'
import exception from '../utils/exception'

const Login = ( props ) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const newUser = await loginService.login({ username, password })
      props.setUser(newUser)
      fileService.setToken(newUser.token)
      if(newUser.role === 'admin'){
        props.getUsers(newUser)
      }
      props.handleNotification('Login successfull!', parameter.notificationTime)
    }catch(error){
      exception.catchException(error, props)
    }
  }

  return (

    <div className='container'>
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
                          <input autoComplete='off' required onChange={({ target }) => setUsername(target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td width="10">
                            Password:
                        </td>

                        <td>
                          <input autoComplete='off' type='password' required onChange={({ target }) => setPassword(target.value)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button className='button' type="submit">login</Button>
          </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  setUser,
  handleNotification,
  handleError,
  getFiles,
  getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)