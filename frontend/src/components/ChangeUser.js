import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import userService from '../services/users'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'


const ChangeUser = ( { showDialog, handleShowDialog, user, ...props } ) => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, SetEmail] = useState('')

  if (user === null){
    return null
  }



  const saveChanges = async (event) => {
    event.preventDefault()
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
      const response = await userService.updateUserDetails(user, user.id)
      if(response.status === 200){
        props.handleNotification('User got updated!', parameter.notificationTime)
        handleShowDialog(false)
      }
    }catch(error){
      exception.catchException(error, props)
    }

  }

  const noChanges = () => {
    handleShowDialog(false)
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
        <Form onSubmit={saveChanges}>
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
                      <input id='idUsername' autoComplete='off' required defaultValue={user.username} type='text' onChange={({target}) => setUsername(target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      Fullname:
                    </td>

                    <td>
                      <input autoComplete='off' id='idName' defaultValue={user.name} type='text' onChange={({target}) => setName(target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      E-Mail:
                    </td>

                    <td>
                      <input autoComplete='off' id='idEmail' required defaultValue={user.email} type='email' onChange={({target}) => SetEmail(target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      Role:
                    </td>

                    <td>
                      <input id='idAdmin' autoComplete='off' type='radio' name='role' value='admin' defaultChecked={user.role === 'admin'} onChange={handleRoleChange}/>admin
                      <input id='idUser' autoComplete='off' type='radio' name='role' value='user' defaultChecked={user.role === 'user'} onChange={handleRoleChange}/>user
                    </td>
                  </tr>
                  <tr>
                    <td width="10">
                      Active:
                    </td>

                    <td>
                      <input id='idActive' autoComplete='off' type='checkbox' name='active' defaultChecked={user.active} onChange={handleActivation}/>
                    </td>
                  </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id='idClose' onClick={noChanges}>
            Close
          </Button>
          <Button variant="primary" id='idSave' type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}




const mapDispatchToProps = {
  handleNotification,
  handleError,
}

export default connect(null, mapDispatchToProps)(ChangeUser)


