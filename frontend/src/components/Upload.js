import React, { useState } from 'react'
import fileService from '../services/files'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'

const Upload = ( { ...props } ) => {

  const [files, setFiles] = useState([])

  const uploadHandler = async (event) => {
    event.preventDefault()
    console.log('start uploading')
    const data = new FormData()
    for(var x = 0; x<files.length; x++) {
      data.append('file', files[x])
    }
    const response = await fileService.sendFiles(data)
    if(response.status === 200){
      props.handleNotification(response.data, 5000)
    }
    else{
      props.handleError(response.data, 5000)
    }
    setFiles([])
  }

  const onChangeHandler = (event) => {
    event.preventDefault()
    setFiles(event.target.files)
  }

  return (
    <div>
      <Form method='POST' encType='multipart/form-data' onSubmit={uploadHandler} >
        <input type="file" name="files" multiple onChange={onChangeHandler}/>
        <Button type="submit">Upload</Button>
      </Form>
    </div>
  )
}


const mapDispatchToProps = {
  handleNotification,
  handleError
}

export default connect(null, mapDispatchToProps)(Upload)