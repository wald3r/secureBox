import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import userService from '../services/users'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'



const ChangePassword = ( { showDialog, handleShowDialog, user, ...props } ) => {

  const [password, setPassword] = useState('')


  if (user === null){
    return null
  }



  const saveChanges = async () => {
    try{
      if(password !== ''){
        const response = await userService.updateUserPassword({ password: password }, user._id)
        if(response.status === 200){
          props.handleNotification('User password got updated!', 5000)
          handleShowDialog(false)
        }

      }else{
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

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
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
                      Password:
                    </td>

                    <td>
                      <input autoComplete='off' type='password' onChange={handlePasswordChange}/>
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

export default connect(null, mapDispatchToProps)(ChangePassword)


