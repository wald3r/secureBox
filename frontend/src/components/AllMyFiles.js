import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap'
import fileService from '../services/files'
import '../stylesheets/general.css'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import fileDownload from 'js-file-download'
import { setFiles } from '../reducers/filesReducer'

const AllMyFiles = ({ ...props }) => {


  const [selectedFiles, setSelectedFiles] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [chosenType, setChosenType] = useState('All')
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')


  const showSelectedButtons = { display: props.files.length === 0 ? 'none' : '' }
  const showCheckedAllName = allSelected === true ? 'Remove selection' : 'Select all'


  const categoryFilter = (chosenType === 'All' ? props.files : props.files.filter(file => file.category === chosenType))
  const nameFilter = searchName === '' ? categoryFilter : categoryFilter.filter(file => file.name.includes(searchName))
  const dateFilter = searchDate === '' ? nameFilter : nameFilter.filter(file => file.date.includes(searchDate))

  const filterStyle = {
    padding: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 'thin'
  }

  const handleSingleDownload = async (file) => {
    try{
      const response = await fileService.getFile(file.id)
      fileDownload(response.data, file.name)
      props.handleNotification('Download started...', 2500)
      await fileService.removeUnencryptedFile(file.id)
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.log(error)
    }
  }

  const handleSingleRemoval = async (file) => {
    try{
      const response = await fileService.removeFile(file.id)
      if(response.status === 200){
        props.handleNotification(`File ${file.name} removed`, 5000)
        props.setFiles(props.files.filter(oFile => oFile.id !== file.id))
      }
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.log(error)
    }
  }

  const handleOneSelection = (file, event) => {
    if(event.target.checked){
      setSelectedFiles(selectedFiles.concat(file))
    }else{
      setSelectedFiles(selectedFiles.filter(sfile => sfile.id !== file.id))
    }
  }


  const handleSelectedRemoval = async () => {
    if(allSelected){
      try{
        await props.files.map(async sfile => {
          await fileService.removeFile(sfile.id)
          props.handleNotification(`File ${sfile.name} removed`, 5000)
        })
        props.setFiles([])
      }catch(error){
        if(error.response){
          props.handleError(error.response.data, 5000)
        }else if (error.request){
          props.handleError(error.request.data, 5000)
        }else{
          props.handleError(error.message, 5000)
        }
        console.log(error)
      }
    }
  }

  const handleSelectedDownload = async () => {

    try{
      if(allSelected){
        await props.files.map(async sfile => {
          const response = await fileService.getFile(sfile.id)
          fileDownload(response.data, sfile.name)
          props.handleNotification('Download started...', 2500)
        })
      }
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }else if (error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.log(error)
    }
  }

  const handleSelectAll = () => {
    var items = document.getElementsByClassName('checkbox')
    for(let a = 0; a < items.length; a++){
      if(items[a].type === 'checkbox'){
        items[a].checked = !items[a].checked
      }
    }
    if(items[0].checked === true){
      setAllSelected(true)
    }else{
      setAllSelected(false)
    }
  }

  const handleNameSearch = (e) => {
    e.preventDefault()
    setSearchName(e.target.value)
  }

  const handleDateSearch = (e) => {
    e.preventDefault()
    setSearchDate(e.target.value)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <div style={filterStyle}>
            Filter:
            <ButtonToolbar>
              <div style={{ padding: 5 }}>
                <DropdownButton id="dropdown-basic-button" title={chosenType}>
                  <Dropdown.Item onClick={() => setChosenType('All')} >All</Dropdown.Item>
                  <Dropdown.Item onClick={() => setChosenType('Picture')} >Picture</Dropdown.Item>
                  <Dropdown.Item onClick={() => setChosenType('Document')} >Document</Dropdown.Item>
                </DropdownButton>
              </div>
            <div style={{ padding: 5 }}>Name: <input onChange={handleNameSearch}/></div>
            <div style={{ padding: 5 }}>Date: <input onChange={handleDateSearch}/></div>
            </ButtonToolbar>
          </div>
          <Table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Select</th>
                <th>Category</th>
                <th>Name</th>
                <th>Mimetype</th>
                <th>Size</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {dateFilter.map(file =>
                <tr key={file.id}>
                  <td><input onClick={({ event }) => handleOneSelection(file, event)} type="checkbox" className='checkbox'/></td>
                  <td>{file.category}</td>
                  <td>{file.name}</td>
                  <td>{file.mimetype}</td>
                  <td>{file.size}</td>
                  <td>{file.date}</td>
                  <td><Button onClick={() => handleSingleDownload(file)}><i className="fa fa-folder"></i></Button></td>
                  <td><Button onClick={() => handleSingleRemoval(file)}><i className="fa fa-trash"></i></Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          <div style={showSelectedButtons}>
            <Button  onClick={handleSelectAll}>{showCheckedAllName}</Button>
            <Button  onClick={handleSelectedRemoval}><i className="fa fa-trash"></i></Button>
            <Button  onClick={handleSelectedDownload}><i className="fa fa-folder"></i></Button>
          </div>
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