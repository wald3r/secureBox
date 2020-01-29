import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addNote } from '../reducers/notesReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { getNotes } from '../reducers/notesReducer'

const AddNote = ( { showAddNote, handleShowAddNote, ...props } ) => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
 

  const noChanges = () => handleShowAddNote(false)

  const saveChanges = async (e) => {
    e.preventDefault()
    try{
      await props.addNote({title: title, body: body})
      await props.getNotes()
      props.handleNotification('Note successfully added', parameter.notificationTime)
      handleShowAddNote(false)
    }catch(error){
      exception.catchException(error, props)
    }
  }


  return (
    <div>
      <Modal show={showAddNote} onHide={noChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Note: </Modal.Title>
        </Modal.Header>
        <Form onSubmit={saveChanges}>
        <Modal.Body>
          <table className='table .table-striped' >
            <thead className='thead-dark'>
              </thead>
                <tbody >
                  <tr>
                    <td >
                      Title:
                    </td>

                    <td>
                      <input type='text' required onChange={({target}) => setTitle(target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <td >
                      Body:
                    </td>
                    <td>
                      <textarea rows='4' cols='40' type='text' required onChange={({target}) => setBody(target.value)}/>
                    </td>
                  </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noChanges}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Add Note
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}



const mapDispatchToProps = {
  addNote,
  handleNotification,
  handleError,
  getNotes,
}


export default connect(null, mapDispatchToProps)(AddNote)