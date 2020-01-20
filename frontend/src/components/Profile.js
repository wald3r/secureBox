import React, { useState } from 'react'
import '../stylesheets/general.css'
import { Table, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { updateUser } from '../reducers/userReducer'
import { changeUser } from '../reducers/usersReducer'
import usersService from '../services/users'
import parameter from '../utils/parameter'

const Profile = ( props ) => {

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  var nameflag = false
  var usernameflag = false
  var emailflag = false

  if(props.user === null){
    return
  }
  const handleUserDetails = async (event) => {
    event.preventDefault()

    if(name === ''){
      nameflag = true
    }
    if(username === ''){
      usernameflag = true
    }
    if(email === ''){
      emailflag = true
    }
    try{
      const response = await usersService.updateUserDetails({
        username: usernameflag === true ? props.user.username : username,
        name: nameflag === true ? props.user.name : name,
        email: emailflag === true ? props.user.email : email,
        active: props.user.active,
        role: props.user.role },
        props.user.id)

      props.updateUser(response.data)
      props.changeUser(response.data)
      props.handleNotification('User updated', parameter.notificationTime)
      setUsername('')
      setName('')
      setEmail('')
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, parameter.errorTime)
      }else if (error.request){
        props.handleError(error.request.data, parameter.errorTime)
      }else{
        props.handleError(error.message, parameter.errorTime)
      }
      console.error(error)
    }
  }

  const handlePassword = async (event) => {

    event.preventDefault()
    if(password1 !== password2){
      props.handleError('Passwords have to be the same', parameter.errorTime)
    }else if(password1 === oldPassword){
      props.handleError('Old and new passwords are the same', parameter.errorTime)
    }else{
      try{
        const response = await usersService.checkUserPassword({ password: oldPassword } , props.user.id)
        if(response.status === 200){
          await usersService.updateUserPassword({ password: password1 }, props.user.id)
          props.handleNotification('Password updated', parameter.notificationTime)
          setOldPassword('')
          setPassword1('')
          setPassword2('')
        }
      }catch(error){
        if(error.response){
          props.handleError(error.response.data, parameter.errorTime)
        }else if (error.request){
          props.handleError(error.request.data, parameter.errorTime)
        }else{
          props.handleError(error.message, parameter.errorTime)
        }
      }
    }

  }

  return (
    <div >
   
        <Form onSubmit={handleUserDetails}>
          <Table className='table'>
            <thead className='thead-dark'>
            <tr>
              <th>Change user details</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>Username</td>
              <td><input autoComplete='off' defaultValue={props.user.username} type='text' onChange={({ target }) => setUsername(target.value)}></input></td>
           </tr>
           <tr>
              <td>Name</td>
              <td><input autoComplete='off' defaultValue={props.user.name} type='text' onChange={({ target }) => setName(target.value)}></input></td>
           </tr>
           <tr>
              <td>E-Mail</td>
              <td><input autoComplete='off' defaultValue={props.user.email} type='email' onChange={({ target }) => setEmail(target.value)}></input></td>
           </tr>
           </tbody>
          </Table>
          <Button type='Submit'>Save changes</Button>
          </Form>
          <Form onSubmit={handlePassword}>
          <Table className='table'>
            <thead className='thead-dark'>
            <tr>
              <th>Change password</th>
            </tr>
          </thead>
          <tbody>
           <tr>
              <td>Old password</td>
              <td><input autoComplete='off' type='password' onChange={({ target }) => setOldPassword(target.value)}></input></td>
           </tr>
           <tr>
              <td>New password</td>
              <td><input autoComplete='off' type='password' onChange={({ target }) => setPassword1(target.value)}></input></td>
           </tr>
           <tr>
              <td>Repeat new password</td>
              <td><input autoComplete='off' type='password' onChange={({ target }) => setPassword2(target.value)}></input></td>
           </tr>
           </tbody>
          </Table>
          <Button type='Submit'>Save changes</Button>
        </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  handleNotification,
  handleError,
  updateUser,
  changeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)