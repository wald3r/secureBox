import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { setFiles } from '../reducers/filesReducer'

const AllMyFiles = ({ ...props }) => {

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

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <Table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Name</th>
                <th>Mimetype</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {props.files.map(file =>
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td>{file.mimetype}</td>
                  <td>{file.size}</td>
                  <td><Button onClick={() => handleSingleDownload(file)}>Download</Button></td>
                  <td><Button onClick={() => handleSingleRemoval(file)}>Delete</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
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