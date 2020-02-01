import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'


const EnterPassword = ( { showEnterPassword, setShowEnterPassword, handleDownload} ) => {
 
  const [password, setPassword] = useState('')

  const noChanges = () => setShowEnterPassword(false)

  const handleAction = (event) => {
    handleDownload(password, event)
    noChanges()
  }

  return (
    <div>
      <Modal show={showEnterPassword} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Password </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleAction(event)}>
        <Modal.Body>
          <table className='table .table-striped' >
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
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Enter Password
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}


export default EnterPassword