import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../stylesheets/general.css'
import FilteredFiles from './FilteredFiles'
import helperClass from '../utils/helperClass'
import { getPictures, getDocuments, getFiles, getFavourites, getMusic } from '../reducers/filesReducer'


const AllFiles = (props) => {

  const [chosenType, setChosenType] = useState('Favourite')
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')

  const nameFilter = searchName === '' ? props.files : props.files.filter(file => helperClass.formatName(file.name).includes(searchName))
  const dateFilter = searchDate === '' ? nameFilter : nameFilter.filter(file => file.date.includes(searchDate))

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
    }else if (e === 'Picture'){
      props.getPictures()
    }else if (e === 'Music'){
      props.getMusic()
    }else if (e === 'Favourite'){
      props.getFavourites(props.user.id)
    }
  }

  return (
    <div>
    <div className='container'>
          <div className='filter'>
            <b>Filter</b><br></br>
              Name: <input type='search' onChange={handleNameSearch}/>
              Date: <input type='search' onChange={handleDateSearch}/>
          </div>
    </div>
    <br></br>
    <div className='container'>
          <div style={{ textAlign: 'center' }}>
            <Tabs id="controlled-tab-example" activeKey={chosenType} onSelect={handleTypeChange}>
             <Tab eventKey="Favourite" title="Favourites">
                <FilteredFiles filteredFiles={dateFilter}/>
              </Tab>
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
              <Tab eventKey="Music" title="Music">
                <FilteredFiles filteredFiles={dateFilter}/>
              </Tab>
            </Tabs>
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
  getPictures,
  getFavourites,
  getMusic
}


export default connect(mapStateToProps, mapDispatchToProps)(AllFiles)