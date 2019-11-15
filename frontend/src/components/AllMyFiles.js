import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'


const AllMyFiles = ({ ...props }) => {

  const fileDownload = require('js-file-download')

  const handleSingleDownload = async (file) => {
    const response = await fileService.getFile(file.id)
    console.log(response)
    console.log(response.headers)
    fileDownload(response.data, file.name)
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

export default connect(mapStateToProps)(AllMyFiles)