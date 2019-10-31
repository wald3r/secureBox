import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import filesService from '../services/files'

const Upload = () => {

  const [files, setFiles] = useState([])

  const onChangeHandler = (event) => {
    console.log(event.target.files)
    setFiles(event.target.files)
  }

  const uploadHandler = async (event) => {
    event.preventDefault()
    console.log('start uploading')
    const data = new FormData()
    data.append('files', files)
    console.log(data)
    await filesService.send(data)
    setFiles([])
  }

  return (
    <div>
      <Form onSubmit={uploadHandler} >
        <input type="file" name="file" multiple onChange={onChangeHandler}/>
        <Button type='submit'>Upload</Button>
      </Form>
    </div>
  )
}

export default Upload