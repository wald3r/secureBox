import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import fileDownload from 'js-file-download'
import { setFiles } from '../reducers/filesReducer'
import { addLastUsed } from '../reducers/userReducer'

import helperClass from '../utils/helperClass'

const AllMyFiles = ({ filteredFiles, ...props }) => {

  const [allSelected, setAllSelected] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
 
  const showSelectedButtons = { display: props.files.length === 0 ? 'none' : '' }
  const showCheckedAllName = allSelected === true ? 'Remove selection' : 'Select all'

  const handleSingleDownload = async (file) => {
    try{
      const response = await fileService.getFile(file.id)
      fileDownload(response.data, file.name)
      //props.addLastUsed(file.id)
      props.handleNotification('Download started...', 2500)
      await fileService.removeUnencryptedFile(file.id)
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
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
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
        props.handleNotification(`File ${file.name} removed`, 5000)
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
        const response = await fileService.getFile(file.id)
        fileDownload(response.data, file.name)
        props.handleNotification('Download started...', 2500)
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

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <Table className='table'>
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
      </div>
    </div>
  )
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
  handleError
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMyFiles)
