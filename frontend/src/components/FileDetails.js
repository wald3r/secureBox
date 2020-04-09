import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'


const FileDetails = ( {handleSendEmail, handleDecryption, handleEncryption, handleConfidentiality, handleSingleDownload, handleSingleRemoval, showFileDetails, handleShowFileDetails, file, ...props } ) => {

  const noChanges = () => handleShowFileDetails(false)


  const handleRemovalModal = () => {
    handleSingleRemoval(file)
    handleShowFileDetails(false)
  }

  const handleEncryptionModal = () => {
    handleEncryption(file)
    handleShowFileDetails(false)
    
  }

  const handleDecryptionModal = () => {
    handleDecryption(file)
    handleShowFileDetails(false)
    
  }

  if(file !== null){

    return (
      <div>
        <Modal show={showFileDetails} onHide={noChanges}>
          <Modal.Header closeButton>
            <Modal.Title>Details </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Button data-toggle='tooltip' data-placement='top' title='Download file' onClick={() => handleSingleDownload(file)}><i className="fa fa-download"></i></Button>
              <Button data-toggle='tooltip' data-placement='top' title='Delete file' onClick={() => handleRemovalModal()}><i className="fa fa-trash"></i></Button>
              <Button style={{ display: file.password !== undefined ? 'none' : '' }} data-toggle='tooltip' data-placement='top' title='Create download link' onClick={() => handleConfidentiality(file)}><i className="fa fa-reply"></i></Button>
              <Button style={{ display: file.password !== undefined ? 'none' : '' }} data-toggle='tooltip' data-placement='top' title='Create and send download link per email' onClick={() => handleSendEmail(file)}><i className="fa fa-envelope"></i></Button>
              <Button style={{ display: file.password !== undefined ? '' : 'none' }} data-toggle='tooltip' data-placement='top' title='Decrypt' onClick={() => handleDecryptionModal()}><i className="fa fa-key	"></i></Button>
              <Button style={{ display: file.password !== undefined ? 'none' : '' }}data-toggle='tooltip' data-placement='top' title='Encrypt' onClick={() => handleEncryptionModal()}><i className="fa fa-key	"></i></Button>
            </Modal.Body>
            <Modal.Footer>
              <Button id='cancel' variant="secondary" onClick={noChanges}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
    }else{
      return (<div></div>)
    }
}



const mapDispatchToProps = {
  handleNotification,
  handleError,
}


export default connect(null, mapDispatchToProps)(FileDetails)