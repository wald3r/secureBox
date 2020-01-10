import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import userService from '../services/users'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'



const ChangeUser = ( { showDialog, handleShowDialog, user, ...props } ) => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, SetEmail] = useState('')

  if (user === null){
    return null
  }



  const saveChanges = async () => {
    if(name !== ''){
      user.name = name
    }
    if(username !== ''){
      user.username = username
    }
    if(email !== ''){
      user.email = email
    }
    try{
      const response = await userService.updateUserDetails(user, user._id)
      if(response.status === 200){
        props.handleNotification('User got updated!', 5000)
        handleShowDialog(false)
      }
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.log(error)
    }

  }


  const noChanges = () => {
    handleShowDialog(false)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handleMailChange = (event) => {
    event.preventDefault()
    SetEmail(event.target.value)
  }

  const handleRoleChange = (event) => {
    var strRole = event.target.value
    strRole.replace(/\s/g, '')
    user.role = strRole
  }

  const handleActivation = () => {
    user.active = !user.active
  }
  return (
    <div>
      <Modal show={showDialog} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user details: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className='table .table-striped' width="10">
            <thead className='thead-dark'>
              </thead>
                <tbody width="10">
                  <tr>
                    <td width="10">
                      Username:
                    </td>

                    <td>
                      <input autoComplete='off' required defaultValue={user.username} type='text' onChange={handleUsernameChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      Fullname:
                    </td>

                    <td>
                      <input autoComplete='off' defaultValue={user.name} type='text' onChange={handleNameChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      E-Mail:
                    </td>

                    <td>
                      <input autoComplete='off' required defaultValue={user.email} type='email' onChange={handleMailChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      Role:
                    </td>

                    <td>
                      <input autoComplete='off' type='radio' name='role' value='admin' defaultChecked={user.role === 'admin'} onChange={handleRoleChange}/>admin
                      <input autoComplete='off' type='radio' name='role' value='user' defaultChecked={user.role === 'user'} onChange={handleRoleChange}/>user
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      Active:
                    </td>

                    <td>
                      <input autoComplete='off' type='checkbox' name='active' defaultChecked={user.active} onChange={handleActivation}/>
                    </td>
                  </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noChanges}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}




const mapDispatchToProps = {
  handleNotification,
  handleError,
}

export default connect(null, mapDispatchToProps)(ChangeUser)


