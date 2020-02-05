import React, { useState } from 'react'
import '../stylesheets/general.css'
import { connect } from 'react-redux'
import Note from './Note'
import AddNote from './AddNote'
import { Button } from 'react-bootstrap'

const Notes = (props) => {

  const [showAddNote, setShowAddNote] = useState(false)
  const [noteFilter, setNoteFilter] = useState('')

  const filteredNotes = noteFilter === '' ? props.notes : props.notes.filter(note => note.title.includes(noteFilter))

  const handleFilter = (e) => {
    e.preventDefault()
    setNoteFilter(e.target.value)
  }

  return (
    <div className='notes'>
      Filter: <input id='idNoteFilter' onChange={handleFilter}/>  <Button id='addNote' data-toggle='tooltip' data-placement='top' title='Add new note' onClick={() => setShowAddNote(true)}><i className="fa fa-plus"/></Button>
      <br></br>
      <br></br>
      <AddNote showAddNote={showAddNote}
               handleShowAddNote={setShowAddNote} />
      {filteredNotes.map(n => 
        <Note note={n} key={n.id}/>
      )}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
}

export default connect(mapStateToProps, null)(Notes)