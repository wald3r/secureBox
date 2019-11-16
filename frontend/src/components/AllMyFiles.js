import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { setFiles } from '../reducers/filesReducer'

const AllMyFiles = ({ ...props }) => {

  const [selectedFiles, setSelectedFiles] = useState([])
  const [checkedFile, setCheckedFile] = useState(false)

  const fileDownload = require('js-file-download')

  const showSelectedButtons = { display: props.files.length === 0 ? 'none' : '' }
  const showCheckedAllName = checkedFile === true ? 'Remove selection' : 'Select all'

  const handleSingleDownload = async (file) => {
    const response = await fileService.getFile(file.id)
    fileDownload(response.data, file.name)
    props.handleNotification('Download started...', 2500)

  }

  const handleSingleRemoval = async (file) => {
    try{
      const response = await fileService.removeFile(file.id)
      if(response.status === 200){
        props.handleNotification(`File ${file.name} removed`, 5000)
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
      }
    }catch(exception){
      props.handleError('File removal failed', 5000)
    }
  }

  const handleOnSelection = (file, event) => {
    if(event.target.checked){
      setSelectedFiles(selectedFiles.concat(file))
    }else{
      setSelectedFiles(selectedFiles.filter(sfile => sfile.id !== file.id))
    }
  }


  const handleSelectedRemoval = async () => {
    try{
      await selectedFiles.map(async sfile => {
        await fileService.removeFile(sfile.id)
        props.handleNotification(`File ${sfile.name} removed`, 5000)
      })
    }catch(exception){
      props.handleError('File removal failed', 5000)
    }
  }

  const handleSelectedDownload = async () => {
    await selectedFiles.map(async sfile => {
      const response = await fileService.getFile(sfile.id)
      fileDownload(response.data, sfile.name)
      props.handleNotification('Download started...', 2500)
    })
  }

  const handleSelectAll = () => {
    setCheckedFile(!checkedFile)
    if(!checkedFile){
      console.log('test')
      setSelectedFiles(props.files)
    }else{
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
                <th>Name</th>
                <th>Mimetype</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {props.files.map(file =>
                <tr key={file.id}>
                  <td><input onClick={() => handleOnSelection(file, event)} type="checkbox" className='checkbox'/></td>
                  <td>{file.name}</td>
                  <td>{file.mimetype}</td>
                  <td>{file.size}</td>
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
  }
}

const mapDispatchToProps = {
  setFiles,
  handleNotification,
  handleError
}
export default connect(mapStateToProps, mapDispatchToProps)(AllMyFiles)