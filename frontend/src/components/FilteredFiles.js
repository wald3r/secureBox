import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import fileDownload from 'js-file-download'
import { setFiles } from '../reducers/filesReducer'
import { addLastUsed, removeLastUsed } from '../reducers/userReducer'
import PublicLink from './PublicLink'
import helperClass from '../utils/helperClass'

const AllMyFiles = ({ filteredFiles, ...props }) => {

  const [allSelected, setAllSelected] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [publicLink, setPublicLink] = useState('')

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

  const handleSingleDownload = async (file) => {
    try{
      const response = await fileService.downloadFile(file.id)
      fileDownload(response.data, file.name)
      props.addLastUsed(file, props.user)
      props.handleNotification('Download started...', 2500)
      await fileService.removeUnencryptedFile(file.id)
      removeSelection()
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.error(error)
    }
  }

  const handleSingleRemoval = async (file) => {
    try{
      const response = await fileService.removeFile(file.id)
      if(response.status === 200){
        props.handleNotification(`File ${file.name} removed`, 5000)
        props.removeLastUsed(file.id, props.user)
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
        removeSelection()
      }
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.error(error)
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
        await fileService.removeFile(file.id)
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
        props.removeLastUsed(file.id, props.user)
        props.handleNotification(`File ${file.name} removed`, 5000)
        removeSelection()
      })
    
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
     }
      console.error(error)
    }
  }

  const handleSelectedDownload = async () => {

    try{
      selectedFiles.map(async file => {
        const response = await fileService.downloadFile(file.id)
        fileDownload(response.data, file.name)
        props.addLastUsed(file, props.user)
        props.handleNotification('Download started...', 2500)
        removeSelection()
      })
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.error(error)
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


  const handleConfidentiality = async (file) => {
    const response = await fileService.makePublic(file.id)
    setShowDialog(true)
    setPublicLink(`localhost:3003/api/files/download/public/${response.data.hash}`)
  }

  if(filteredFiles.length === 0){
    return (
      <div>
        No files
      </div>
    )
  }else{
    return (
        <div className='tablehelper'> 
        <PublicLink showDialog={showDialog}
                    handleShowDialog={setShowDialog}
                    link={publicLink}/>
          <Table responsive className='table table-hover'>
            <thead className='thead-dark'>
              <tr>
                <th>Select</th>
                <th>Category</th>
                <th>Name</th>
                <th>Mimetype</th>
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
                  <td>{file.mimetype}</td>
                  <td>{file.size}</td>
                  <td>{file.date}</td>
                  <td><Button onClick={() => handleSingleDownload(file)}><i className="fa fa-folder"></i></Button></td>
                  <td><Button onClick={() => handleSingleRemoval(file)}><i className="fa fa-trash"></i></Button></td>
                  <td><Button onClick={() => handleConfidentiality(file)}><i className="fa fa-trash"></i></Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          <div style={showSelectedButtons}>
            <Button  onClick={handleSelectAll}>{showCheckedAllName}</Button>
            <Button  onClick={handleSelectedRemoval}><i className="fa fa-trash"></i></Button>
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
  handleError
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMyFiles)
