import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const Confirmation = ({ showConfirmation, setConfirmation, handleConfirmation }) => {


  const saveChanges = () => {
    setConfirmation(false)
    handleConfirmation()
  }


  const noChanges = () => {
    setConfirmation(false)
  }

  return (
    <div>
      <Modal show={showConfirmation} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to proceed with this action?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noChanges}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}



export default Confirmation