import React, { useState } from 'react'
import fileService from '../services/files'
import { Form, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { getFiles } from '../reducers/filesReducer'
import '../stylesheets/general.css'

const Upload = ( { ...props } ) => {

  const [files, setFiles] = useState([])
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [style, setStyle]= useState(false)

  const priorityStyle = {
    padding: 5,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 'thin'
  }

  const noPriorityStyle = {
    padding: 5,
  }

  const chosenStyle = style ? priorityStyle : noPriorityStyle

  const checkMimeType= () => {
    const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'application/txt']
    let err = []
    for(var x = 0; x<files.length; x++) {
      if(types.every(type => files[x].type !== type)){
        err = err.concat(files[x].type)
      }
    }

    if(err.length !== 0){
      props.handleError(`${err} not supported format`, 5000)
      return false
    }
    return true
  }

  const uploadHandler = async (event) => {
    try{
      event.preventDefault()
      if(files.length === 0){
        props.handleError('No files!', 5000)
      }else if(checkMimeType()){
        console.log('start uploading')
        const data = new FormData()
        for(var x = 0; x<files.length; x++) {
          data.append('file', files[x])
        }
        const response = await fileService.sendFiles(data)
        if(response.status === 200){
          setStyle(false)
          props.handleNotification(response.data, 5000)
          props.getFiles()
        }
        else{
          props.handleError(response.data, 5000)
        }
        setFiles([])
      }
      window.location.reload()
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

  const onChangeHandler = (event) => {
    event.preventDefault()
    setFiles(event.target.files)
  }

  const handleSettings = (e) => {
    e.preventDefault()
    setStyle(!style)
    var items = document.getElementsByClassName('secondary')
    console.log(items)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <div style={chosenStyle} >
            <Form onSubmit={handleSettings}>
            <ButtonGroup className="mr-2" aria-label="First group">
              <Button variant="secondary">Documents</Button>
              <Button variant="secondary">Pictures</Button>
            </ButtonGroup>
            <input onChange={({ target }) => setName(target.value)}/>
            <Button type="submit">Save</Button>
            </Form>
          </div>
          <div className='form-group files' >
            <Form method='POST' encType='multipart/form-data' onSubmit={uploadHandler} >
              <input type='file' autoComplete='off' name='files' multiple onChange={onChangeHandler}/>
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