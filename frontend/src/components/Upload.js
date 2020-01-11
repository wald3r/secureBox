import React, { useState } from 'react'
import fileService from '../services/files'
import { Form, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { getFiles } from '../reducers/filesReducer'
import helperClass from '../utils/helperClass'
import '../stylesheets/general.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Upload = ( { ...props } ) => {

  const [files, setFiles] = useState([])
  const [type, setType] = useState('')
  const [newName, setNewName] = useState('')
  const [style, setStyle]= useState(false)
  const [newDate, setNewDate] = useState('')
  const [disableInput, setDisableInput] = useState(false)

  const priorityStyle = {
    padding: 5,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 'thin'
  }

  const noPriorityStyle = {
    padding: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 'thin'
  }

  const chosenStyle = style ? priorityStyle : noPriorityStyle

  const checkMimeType= () => {
    const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'application/txt']
    let noErr = false
    for(var x = 0; x<files.length; x++) {
      for(let i = 0; i < types.length; i++){
        if(types[i] === files[x].type){
          noErr = true
        }
      }
      if(noErr === false){
        props.handleError(`${files[x].type} not supported format`, 5000)
        return noErr
      }
    }

  
    return noErr
  }

  const uploadHandler = async (event) => {
    try{
      event.preventDefault()
      if(files.length === 0){
        props.handleError('No files!', 5000)
      }else if(type === ''){
        props.handleError('Is it a document or a picture?', 5000)
      }else if(style === false){
        props.handleError('Save your settings!', 5000)
      }else if(checkMimeType()){
        const data = new FormData()
        for(var x = 0; x<files.length; x++) {
          data.append('file', files[x], `${helperClass.createName(props.user.username, type, files[x].type, files[x].name, newName, newDate, x+1)}`)
        }
        const response = await fileService.sendFiles(data)
        if(response.status === 200){
          setStyle(false)
          props.handleNotification(response.data, 5000)
        }
        else{
          props.handleError(response.data, 5000)
        }
        setFiles([])
        window.location.reload()
      }
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
    setStyle(!style)
    if(!style){
      e.preventDefault()
      setDisableInput(true)
    }else{
      setDisableInput(false)
      setNewName('')
      setType('')
    }
  }

  const handleTimeChange = (date) => {
    setNewDate(date)

  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <div style={chosenStyle} >
            Settings:
            <Form onSubmit={handleSettings}>
            <ButtonGroup className="mr-2" aria-label="First group">
              <Button className='fileButton' active={type === 'Document'} disabled={disableInput} onClick={() => setType('Document')} variant="secondary">Documents</Button>
              <Button className='fileButton' active={type === 'Picture'}  disabled={disableInput} onClick={() => setType('Picture')} variant="secondary">Pictures</Button>
            </ButtonGroup>
            <DatePicker onChange={handleTimeChange} selected={newDate} disabled={disableInput}/>
            <input onChange={({ target }) => setNewName(target.value)} disabled={disableInput}/>
            <Button type="submit">{!style ? 'Save' : 'Remove'}</Button>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  handleNotification,
  handleError,
  getFiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)