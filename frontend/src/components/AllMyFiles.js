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

  const fileDownload = require('js-file-download')



  const handleSingleDownload = async (file) => {
    const response = await fileService.getFile(file.id)
    fileDownload(response.data, file.name)

  }

  const handleSingleRemoval = async (file) => {
    try{
      const response = await fileService.removeFile(file.id)
      if(response.status === 200){
        props.handleNotification(response.data, 5000)
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
      }
    }catch(exception){
      props.handleError('File removal failed', 5000)
    }
  }

  console.log(selectedFiles)
  const handleOnSelection = (file, event) => {
    if(event.target.checked){
      setSelectedFiles(selectedFiles.concat(file))
    }else{
      setSelectedFiles(selectedFiles.filter(sfile => sfile.id !== file.id))
    }
  }


  const handleSelectedRemoval = async () => {
    await selectedFiles.map(async sfile => {
      await fileService.removeFile(sfile.id)
    })
  }

  const handleSelectedDownload = async () => {
    await selectedFiles.map(async sfile => {
      const response = await fileService.getFile(sfile.id)
      fileDownload(response.data, sfile.name)
    })
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
                  <td><Button onClick={() => handleSingleDownload(file)}>Download</Button></td>
                  <td><Button onClick={() => handleSingleRemoval(file)}>Delete</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          <Button onClick={handleSelectedRemoval}>Delete all</Button>
          <Button onClick={handleSelectedDownload}>Download all</Button>
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