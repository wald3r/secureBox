import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const PublicLink = ( { showDialog, handleShowDialog, link, ...props } ) => {

  const noChanges = () => {
    handleShowDialog(false)
  }


  return (
    <div>
      <Modal show={showDialog} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Public link: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input autoComplete='off' type='url' value={link} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noChanges}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}






export default PublicLink


