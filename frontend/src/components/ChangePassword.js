import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import userService from '../services/users'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'


const ChangePassword = ( { showDialog, handleShowDialog, user, ...props } ) => {

  const [password, setPassword] = useState('')


  if (user === null){
    return null
  }



  const saveChanges = async (event) => {
    event.preventDefault()
    try{
      if(password !== ''){
        const response = await userService.updateUserPassword({ password: password }, user.id)
        if(response.status === 200){
          props.handleNotification('User password got updated!', parameter.notificationTime)
          handleShowDialog(false)
        }

      }else{
        handleShowDialog(false)
      }
    }catch(error){
      exception.catchException(error, props)
    }
  }


  const noChanges = () => {
    handleShowDialog(false)
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
                      Password:
                    </td>

                    <td>
                      <input autoComplete='off' type='password' onChange={({target}) => setPassword(target.value)}/>
                    </td>
                  </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noChanges}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
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

export default connect(null, mapDispatchToProps)(ChangePassword)


