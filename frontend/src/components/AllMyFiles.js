import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import '../stylesheets/general.css'

const AllMyFiles = ({ ...props }) => {


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