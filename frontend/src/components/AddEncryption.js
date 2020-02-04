import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'



const AddEncryption = ({ showAddEncryption , setShowAddEncryption, handleEncryption  }) => {


  const [password, setPassword] = useState('')

  const noChanges = () => {
    setShowAddEncryption(false)
    window.location.reload()
  }

  const saveChanges = () => {
      handleEncryption(password)
  }

  return (
    <div>
      <Modal show={showAddEncryption} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Add Encryption: </Modal.Title>
        </Modal.Header>
        <Form onSubmit={saveChanges}>
        <Modal.Body>
          <table className='table .table-striped' >
            <thead className='thead-dark'>
              </thead>
                <tbody >
                  <tr>
                    <td >
                      Password:
                    </td>

                    <td>
                      <input type='text' required onChange={({target}) => setPassword(target.value)} />
                    </td>
                  </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noChanges}>
            No Encryption
          </Button>
          <Button variant="primary" type='submit'>
            Add Encryption
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}


export default AddEncryption