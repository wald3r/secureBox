import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import notesService from '../services/notes'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { removeNote } from '../reducers/notesReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'
import helperClass from '../utils/helperClass'
import Confirmation from './Confirmation'

const Note = ({ note, ...props }) => {

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleRemoval = async () => {
    try{
      const response = await notesService.removeNote(note.id)
      props.removeNote(note)
      props.handleNotification(response.data, parameter.notificationTime)
    }catch(error){
      exception.catchException(error, props)
    }

  }

  return(
    <div>
      <Confirmation
        showConfirmation={showConfirmation}
        setConfirmation={setShowConfirmation}
        handleConfirmation={handleRemoval}/>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {note.title}

            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {note.body}
              <br></br>
              <br></br>
              <p>________________________________</p>
              <p>Created: {helperClass.formatTime(note.createdAt)}</p>
              <p>Updated: {helperClass.formatTime(note.updatedAt)}</p>
              <Button id='deleteNote' data-toggle='tooltip' data-placement='top' title='Delete note' onClick={() => setShowConfirmation(true)}><i className="fa fa-trash"></i></Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

const mapDispatchToProps = {
  handleNotification,
  handleError,
  removeNote
}


export default connect(null, mapDispatchToProps)(Note)