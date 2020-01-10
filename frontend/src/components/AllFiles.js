import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../stylesheets/general.css'
import FilteredFiles from './FilteredFiles'
import helperClass from '../utils/helperClass'
import { getPictures, getDocuments, getFiles } from '../reducers/filesReducer'


const AllFiles = (props) => {

  const [chosenType, setChosenType] = useState('LastUsed')
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')

  //const categoryFilter = (chosenType === 'All' ? props.files : props.files.filter(file => file.category === chosenType))
  const nameFilter = searchName === '' ? props.files : props.files.filter(file => helperClass.formatName(file.name).includes(searchName))
  const dateFilter = searchDate === '' ? nameFilter : nameFilter.filter(file => file.date.includes(searchDate))


  const filterStyle = {
    padding: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 'thin'
  }

  const handleNameSearch = (e) => {
    e.preventDefault()
    setSearchName(e.target.value)
  }

  const handleDateSearch = (e) => {
    e.preventDefault()
    setSearchDate(e.target.value)
  }

  const handleTypeChange = (e) => {
    setChosenType(e)
    if(e === 'All'){
      props.getFiles()
    }else if (e === 'Document'){
      props.getDocuments()
    }else{
      props.getPictures()
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <div style={filterStyle}>
            <b>Filter</b><br></br>
              Name: <input type='search' onChange={handleNameSearch}/>
              Date: <input type='search' onChange={handleDateSearch}/>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Tabs id="controlled-tab-example" activeKey={chosenType} onSelect={handleTypeChange}>
              <Tab eventKey="LastUsed" title="Last Used">
                <FilteredFiles filteredFiles={props.user.lastUsed}/>
              </Tab>
              <Tab eventKey="All" title="All">
                <FilteredFiles filteredFiles={dateFilter}/>
              </Tab>
              <Tab eventKey="Document" title="Documents">
                <FilteredFiles filteredFiles={dateFilter}/>
              </Tab>
              <Tab eventKey="Picture" title="Pictures">
                <FilteredFiles filteredFiles={dateFilter}/>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    files: state.files,
  }
}

const mapDispatchToProps = {
  getDocuments,
  getFiles,
  getPictures
}


export default connect(mapStateToProps, mapDispatchToProps)(AllFiles)