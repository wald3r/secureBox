import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import fileDownload from 'js-file-download'
import { setFiles, changeFile, removeFile } from '../reducers/filesReducer'
import { addLastUsed, removeLastUsed } from '../reducers/userReducer'
import PublicLink from './PublicLink'
import SendPublicLink from './SendPublicLink'
import helperClass from '../utils/helperClass'
import parameter from '../utils/parameter'
import exception from '../utils/exception'
import Confirmation from './Confirmation'
import EnterPassword from './EnterPassword'

const AllMyFiles = ({ filteredFiles, ...props }) => {

  const [allSelected, setAllSelected] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [publicLink, setPublicLink] = useState('')
  const [file, setFile] = useState(null)
  const [showConfirmationSingle, setShowConfirmationSingle] = useState(false)
  const [showConfirmationSelected, setShowConfirmationSelected] = useState(false)
  const [singleFileToDelete, setSingleFileToDelete] = useState(null)
  const [showEnterPasswordSingle, setShowEnterPasswordSingle] = useState(false)
  const [showEnterPasswordSelected, setShowEnterPasswordSelected] = useState(false)
  const [showEnterPasswordEncrypt, setShowEnterPasswordEncrypt] = useState(false)
  const [showEnterPasswordDecrypt, setShowEnterPasswordDecrypt] = useState(false)


  const [fileToDownload, setFileToDownload] = useState(null)

  const showSelectedButtons = { display: props.files.length === 0 ? 'none' : '' }
  const showCheckedAllName = allSelected === true ? 'Remove selection' : 'Select all'

  const removeSelection = () => {
    setAllSelected(false)
    setSelectedFiles([])
    var items = document.getElementsByClassName('checkbox')
  
    for(let a = 0; a < items.length; a++){
      if(items[a].type === 'checkbox'){
          items[a].checked = false
      }
    }
  }

  const singleDownload = async (password, event) => {

    try{
  
      event.preventDefault()
      const response = await fileService.downloadEncryptedFile(fileToDownload.id, password)
      fileDownload(response.data, fileToDownload.name)
      props.addLastUsed(fileToDownload, props.user)
      props.handleNotification('Download started...', 2500)
      await fileService.removeLeftovers(fileToDownload.id)
      removeSelection()

    }catch(error){
      if(error.response.status === 401){
          props.handleError(error.response.statusText, parameter.errorTime)
      }
      else if(error.response.status === 404){
        props.handleError(error.response.statusText, parameter.errorTime)
    }
      else{
        exception.catchException(error, props)
      }
    }
  }

  const handleSingleDownload = async (file) => {
      if(file.password !== undefined){
        setFileToDownload(file)
        setShowEnterPasswordSingle(true)
      }else{
        try{
          const response = await fileService.downloadFile(file.id)
          fileDownload(response.data, file.name)
          props.addLastUsed(file, props.user)
          props.handleNotification('Download started...', 2500)
          removeSelection()
        }catch(error){
          if(error.response.status === 401){
              props.handleError(error.response.statusText, parameter.errorTime)
          }
          else if(error.response.status === 404){
            props.handleError(error.response.statusText, parameter.errorTime)
        }
          else{
            exception.catchException(error, props)
          }
        }

      }
      
  
  }

  const handleSingleRemoval = (file) => {
    setSingleFileToDelete(file)
    setShowConfirmationSingle(true)
  }

  const removeSingleFile = async () => {
    try{
      if(singleFileToDelete.password !== undefined) {
        await fileService.removeFile(singleFileToDelete.id)
      }
      else{
        await fileService.removeUnencryptedFile(singleFileToDelete.id)
      }
      props.removeFile(singleFileToDelete)
      props.handleNotification(`File ${singleFileToDelete.name} removed`, parameter.notificationTime)
      props.removeLastUsed(singleFileToDelete.id, props.user)
      props.setFiles(props.files.filter(oFile => oFile.id !== singleFileToDelete.id))
      removeSelection()
      
    }catch(error){
      exception.catchException(error, props)
    }
  }

  const handleOneSelection = (file, event) => {
    if(event.target.checked){
      setSelectedFiles(selectedFiles.concat(file))
    }else{
      setSelectedFiles(selectedFiles.filter(sfile => sfile.id !== file.id))
    }
  }


  const handleSelectedRemoval = async () => {
    try{
      selectedFiles.map(async file => {
        if(file.password !== undefined) {
          await fileService.removeFile(file.id)
        }
        else{
          await fileService.removeUnencryptedFile(file.id)
        }
        props.removeFile(file)
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
        props.removeLastUsed(file.id, props.user)
        props.handleNotification(`File ${file.name} removed`, parameter.notificationTime)
        removeSelection()
      })
    
    }catch(error){
      exception.catchException(error, props)
    }
  }

  const handleSelectedDownload = async () => {

    var flag = false
    selectedFiles.map(async file => {
      if(file.password !== undefined){
        flag = true
      }
    })
 
    if(flag){
      setShowEnterPasswordSelected(true)
    }else{
      try{
        selectedFiles.map(async file => {
          const response = await fileService.downloadFile(file.id)
          fileDownload(response.data, file.name)
          props.addLastUsed(file, props.user)
          props.handleNotification('Download started...', 2500)
        })
        removeSelection()
      }catch(error){
        exception.catchException(error, props)
      }
    }
  }


  const selectedDownload = async (password, event) => {

    try{
      event.preventDefault()
      selectedFiles.map(async file => {
        if(file.password !== undefined){
          const response = await fileService.downloadEncryptedFile(file.id, password)
          fileDownload(response.data, file.name)
          props.addLastUsed(file, props.user)
          props.handleNotification('Download started...', 2500)
          await fileService.removeLeftovers(file.id)
        }else{
          const response = await fileService.downloadFile(file.id)
          fileDownload(response.data, file.name)
          props.addLastUsed(file, props.user)
          props.handleNotification('Download started...', 2500)
        }
      })
      removeSelection()
    }catch(error){
      if(error.response.status === 401){
        props.handleError(error.response.statusText, parameter.errorTime)
      }
      else if(error.response.status === 404){
        props.handleError(error.response.statusText, parameter.errorTime)
      }
      else{
       exception.catchException(error, props)
      }
    }
  }

  const handleSelectAll = () => {
    var items = document.getElementsByClassName('checkbox')
    setAllSelected(!allSelected)
    if(allSelected === false){
      for(let a = 0; a < items.length; a++){
        if(items[a].type === 'checkbox'){
          items[a].checked = true
        }
      }
      setSelectedFiles(props.files)
    }
    else{
      for(let a = 0; a < items.length; a++){
        if(items[a].type === 'checkbox'){
          items[a].checked = false
        }
      }
      setSelectedFiles([])
    }
   
  }

  const encryptFile = async (password, event) => {
    event.preventDefault()
    try{
      const response = await fileService.encryptFile({password: password, file: file.name})
      props.changeFile(response.data)
      props.handleNotification('File encrypted', parameter.notificationTime)
      setFile(null)

    }catch(error){
      exception.catchException(error, props)

    }
  }

  const decryptFile = async (password, event) => {
    event.preventDefault()
    try{
      const response = await fileService.decryptFile({password: password, file: file.name})
      props.changeFile(response.data)
      props.handleNotification('File decrypted', parameter.notificationTime)
      setFile(null)
    }catch(error){
      exception.catchException(error, props)

    }
  }

  const handleEncryption = (file) => {
    setShowEnterPasswordEncrypt(true)
    setFile(file)
  }

  const handleDecryption = (file) => {
    setShowEnterPasswordDecrypt(true)
    setFile(file)
  }

  const handleConfidentiality = async (file) => {
    try{
      const response = await fileService.makePublic(file.id)
      setShowLinkDialog(true)
      setPublicLink(`${parameter.downloadLink}${response.data.hash}`)
    }catch(error){
      exception.catchException(error, props)
    }
  }


  const handleSendEmail = async (file) => {
    setFile(file)
    setShowEmailDialog(true)
  }

  if(filteredFiles.length === 0){
    return (
      <div>
        No files
      </div>
    )
  }else{
    return (
        <div className='tablecontainer'> 
            <EnterPassword 
            showEnterPassword={showEnterPasswordEncrypt}
            setShowEnterPassword={setShowEnterPasswordEncrypt}
            handleDownload={encryptFile} 
          />
           <EnterPassword 
            showEnterPassword={showEnterPasswordDecrypt}
            setShowEnterPassword={setShowEnterPasswordDecrypt}
            handleDownload={decryptFile} 
          />
          <EnterPassword 
            showEnterPassword={showEnterPasswordSingle}
            setShowEnterPassword={setShowEnterPasswordSingle}
            handleDownload={singleDownload} 
          />
          <EnterPassword 
            showEnterPassword={showEnterPasswordSelected}
            setShowEnterPassword={setShowEnterPasswordSelected}
            handleDownload={selectedDownload} 
          />
          <Confirmation 
            showConfirmation={showConfirmationSingle}
            setConfirmation={setShowConfirmationSingle}
            handleConfirmation={removeSingleFile}
          />
           <Confirmation 
            showConfirmation={showConfirmationSelected}
            setConfirmation={setShowConfirmationSelected}
            handleConfirmation={handleSelectedRemoval}
          />
          <PublicLink showDialog={showLinkDialog}
                    handleShowDialog={setShowLinkDialog}
                    link={publicLink}/>
          <SendPublicLink showDialog={showEmailDialog}
                    handleShowDialog={setShowEmailDialog}
                    file={file}/>
          <Table responsive className='table table-hover'>
            <thead className='thead-dark'>
              <tr>
                <th>Select</th>
                <th>Category</th>
                <th>Name</th>
                <th>Encrypted</th>
                <th>Size</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map(file =>
                <tr key={file.id}>
                  <td><input onClick={(event) => handleOneSelection(file, event)} type="checkbox" className='checkbox'/></td>
                  <td>{file.category}</td>
                  <td>{helperClass.formatName(file.name)}</td>
                  <td>{file.password === undefined ? '' : 'x'}</td>
                  <td>{file.size}</td>
                  <td>{file.date}</td>
                  <td>
                      <Button data-toggle='tooltip' data-placement='top' title='Download file' onClick={() => handleSingleDownload(file)}><i className="fa fa-download"></i></Button>
                      <Button data-toggle='tooltip' data-placement='top' title='Delete file' onClick={() => handleSingleRemoval(file)}><i className="fa fa-trash"></i></Button>
                      <Button style={{ display: file.password !== undefined ? 'none' : '' }} data-toggle='tooltip' data-placement='top' title='Create download link' onClick={() => handleConfidentiality(file)}><i className="fa fa-reply"></i></Button>
                      <Button style={{ display: file.password !== undefined ? 'none' : '' }} data-toggle='tooltip' data-placement='top' title='Create and send download link per email' onClick={() => handleSendEmail(file)}><i className="fa fa-envelope"></i></Button>
                      <Button style={{ display: file.password !== undefined ? '' : 'none' }} data-toggle='tooltip' data-placement='top' title='Decrypt' onClick={() => handleDecryption(file)}><i className="fa fa-key	"></i></Button>
                      <Button style={{ display: file.password !== undefined ? 'none' : '' }}data-toggle='tooltip' data-placement='top' title='Encrypt' onClick={() => handleEncryption(file)}><i className="fa fa-key	"></i></Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div style={showSelectedButtons}>
            <Button  onClick={handleSelectAll}>{showCheckedAllName}</Button>
            <Button  onClick={() => setShowConfirmationSelected(true)}><i className="fa fa-trash"></i></Button>
            <Button  onClick={handleSelectedDownload}><i className="fa fa-folder"></i></Button>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.files,
    user: state.user,
  }
}

const mapDispatchToProps = {
  setFiles,
  handleNotification,
  addLastUsed,
  removeLastUsed,
  handleError,
  changeFile,
  removeFile,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMyFiles)
