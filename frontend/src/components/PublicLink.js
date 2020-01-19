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
          <Modal.Title>Public Link: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ color: 'red'}}>Attention! This is a one-time-only link. If not used, it will get invalid at midnight.</div>
          <br></br>
          <input autoComplete='off' style={{width:'100%'}} type='text' value={link} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={noChanges}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}






export default PublicLink


