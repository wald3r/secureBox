import React, { useState } from 'react'
import filesService from '../services/files'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'

//import { useDropzone } from 'react-dropzone'

const Upload = ( { ...props } ) => {
/*
  const onDrop = useCallback(async acceptedFiles => {
    console.log(acceptedFiles)
    let data = new FormData()
    data.append('file', acceptedFiles)
    await filesService.sendPhotos(data)
  }, [])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )*/

  const [files, setFiles] = useState([])

  const uploadHandler = async (event) => {
    event.preventDefault()
    console.log('start uploading')
    const data = new FormData()
    for(var x = 0; x<files.length; x++) {
      data.append('file', files[x])
    }
    await filesService.sendPhotos(data)
    props.handleNotification('Files uploaded', 5000)
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