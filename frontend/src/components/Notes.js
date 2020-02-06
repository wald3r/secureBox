import React, { useState } from 'react'
import '../stylesheets/general.css'
import { connect } from 'react-redux'
import Note from './Note'
import AddNote from './AddNote'
import { Button } from 'react-bootstrap'
import helperClass from '../utils/helperClass'

const Notes = (props) => {

  const [showAddNote, setShowAddNote] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchDate, setSearchDate] = useState('')

  const dateFilter = searchDate === '' ? props.notes : props.notes.filter(note => helperClass.formatTime(note.createdAt).includes(searchDate))
  const filteredNotes = searchName === '' ? dateFilter : dateFilter.filter(note => note.title.includes(searchName))

  const handleFilter = (e) => {
    e.preventDefault()
    setSearchName(e.target.value)
  }

  const handleDateSearch = (e) => {
    e.preventDefault()
    setSearchDate(e.target.value)
  }

  return (
    <div>
      <div className='container'>
        <div className='filter'>
          Name: <input type='search'id='idNameFilter' onChange={handleFilter}/> 
          Date: <input type='search' id='idDateFilter' onChange={handleDateSearch}/>
        </div>
      </div>
      <br></br>
      <div style={{ textAlign: 'center' }} className='notes'>
      <Button id='addNote' style={{ textAlign: 'center' }} data-toggle='tooltip' data-placement='top' title='Add new note' onClick={() => setShowAddNote(true)}>Add new Note</Button>
        <br></br>
        <br></br>
        <AddNote 
          showAddNote={showAddNote}
          handleShowAddNote={setShowAddNote} />
          {filteredNotes.map(n => 
            <Note note={n} key={n.id}/>
          )}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
}

export default connect(mapStateToProps, null)(Notes)