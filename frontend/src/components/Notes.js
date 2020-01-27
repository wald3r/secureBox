import React, { useState } from 'react'
import '../stylesheets/general.css'
import { connect } from 'react-redux'
import Note from './Note'
import AddNote from './AddNote'
import { Button } from 'react-bootstrap'

const Notes = (props) => {

  const [showAddNote, setShowAddNote] = useState(false)


  return (
    <div className='container'>
      <Button onClick={() => setShowAddNote(true)}><i className="fa fa-plus"/></Button>
      <AddNote showAddNote={showAddNote}
               handleShowAddNote={setShowAddNote} />
      {props.notes.map(n => 
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