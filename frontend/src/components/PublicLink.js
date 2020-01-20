import React from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'


const PublicLink = ( { showDialog, handleShowDialog, link, ...props } ) => {

  const noChanges = () => {
    handleShowDialog(false)
  }

  const handleCopyToClipboard = () => {
    var copyText = document.getElementById("copyText");
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy')
  }


  return (
    <div>
      <Modal size='lg' show={showDialog} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Public Link: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' style={{width: '90%'}} id='copyText' defaultValue={link}/><Button data-toggle='tooltip' data-placement='top' title='Copy to clipboard' onClick={handleCopyToClipboard}><i className="fa fa-clipboard"></i></Button>
          <br></br>
          <br></br>
          <div style={{ color: 'red'}}><Badge variant="secondary">Attention</Badge> This is a one-time-only link. If not used, it will get invalid after midnight.</div>
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


