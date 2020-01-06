import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'


const Confirmation = ({ handleConfirmation }) => {

  const [show, setShow] = useState(true)


  const handleClose = () => setShow(false)

  const SaveChanges = () => {
    setShow(false)
    handleConfirmation()
  }


  const NoChanges = () => {
    setShow(false)
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to proceed with this action?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={NoChanges}>
            Close
          </Button>
          <Button variant="primary" onClick={SaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}



export default Confirmation