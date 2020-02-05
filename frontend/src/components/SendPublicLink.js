import React, { useState } from 'react'
import { Form, Modal, Button, Badge } from 'react-bootstrap'
import fileService from '../services/files'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'

const SendPublicLink = ( { showDialog, handleShowDialog, file, ...props } ) => {

  const [email, setEmail] = useState('')
  const [link, setLink] = useState('')

  const noChanges = () => {
    handleShowDialog(false)
  }

  const handleSubmit = async (e) => {
    try{
      e.preventDefault()
      const response = await fileService.sendPublicMail(file.id, email)
      setLink(`${parameter.downloadLink}${response.data.hash}`)
      handleShowDialog(false)
    }catch(error){
      exception.catchException(error, props)
    }
  }

  return (
    <div>
      <Modal size='lg' show={showDialog} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Send public link per email </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
            Email: <input type='email' required onChange={({target}) => setEmail(target.value)}/>
            <br></br>

            <br></br>
            <br></br>
            <div style={{ color: 'red'}}><Badge variant="secondary">Attention</Badge> This will send a one-time-only link to the entered address. If not used, it will get invalid after midnight.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Send
          </Button>
          <Button variant="secondary" onClick={noChanges} >
            Close
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}


const mapDispatchToProps = {
  handleNotification,
  handleError
}

export default connect(null, mapDispatchToProps)(SendPublicLink)


