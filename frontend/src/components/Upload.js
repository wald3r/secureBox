import React, { useState } from 'react'
import fileService from '../services/files'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { getFiles } from '../reducers/filesReducer'
import '../upload.css'

const Upload = ( { ...props } ) => {

  const [files, setFiles] = useState([])

  const uploadHandler = async (event) => {
    event.preventDefault()
    console.log(files.length)
    if(files.length === 0){
      props.handleError('No files!', 5000)
    }else{
      console.log('start uploading')
      const data = new FormData()
      for(var x = 0; x<files.length; x++) {
        data.append('file', files[x])
      }
      const response = await fileService.sendFiles(data)
      if(response.status === 200){
        props.handleNotification(response.data, 5000)
        props.getFiles()
      }
      else{
        props.handleError(response.data, 5000)
      }
      setFiles([])
    }
    window.location.reload()
  }

  const onChangeHandler = (event) => {
    event.preventDefault()
    setFiles(event.target.files)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-9'>
          <div className='form-group files' >
            <Form method='POST' encType='multipart/form-data' onSubmit={uploadHandler} >
              <input type='file' name='files' multiple onChange={onChangeHandler}/>
              <Button className='button' type="submit">Upload</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = {
  handleNotification,
  handleError,
  getFiles
}

export default connect(null, mapDispatchToProps)(Upload)