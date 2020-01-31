import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'


const EnterPassword = ( { showEnterPassword, setShowEnterPassword, handleDownload} ) => {
 
  const [password, setPassword] = useState('')

  const noChanges = () => setShowEnterPassword(false)

  const handlePassword = async () => {
    handleDownload(password)
  }


  return (
    <div>
      <Modal show={showEnterPassword} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Password: </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlePassword}>
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