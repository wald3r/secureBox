import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addType } from '../reducers/mimetypesReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'


const AddMime = ( { showAddMime, handleShowAddMime, ...props } ) => {

  const [name, setName] = useState('')
  const [ending, setEnding] = useState('')




  const noChanges = () => handleShowAddMime(false)

  const saveChanges = async (e) => {
    e.preventDefault()
    try{
      await props.addType({ name: name, ending: ending })
      props.handleNotification('MIME-Type successfully added', parameter.notificationTime)
      handleShowAddMime(false)
    }catch(error){
      exception.catchException(error, props)
    }
  }


  return (
    <div>
      <Modal show={showAddMime} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Add new MIME-Type</Modal.Title>
        </Modal.Header>
        <Form onSubmit={saveChanges}>
          <Modal.Body>
            <table className='table .table-striped' width="10">
              <thead className='thead-dark'>
              </thead>
              <tbody width="10">
                <tr>
                  <td width="10">
                      Name:
                  </td>

                  <td>
                    <input id='idAddName'type='text' required onChange={({ target }) => setName(target.value)} />
                  </td>
                </tr>
                <tr>
                  <td width="10">
                      Ending:
                  </td>
                  <td>
                    <input type='text' id='idAddEnding' required onChange={({ target }) => setEnding(target.value)}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" id='idClose' onClick={ noChanges }>
            Close
            </Button>
            <Button variant="primary" id='idSave' type='submit'>
            Add MIME-Type
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}



const mapDispatchToProps = {
  addType,
  handleNotification,
  handleError,
}


export default connect(null, mapDispatchToProps)(AddMime)