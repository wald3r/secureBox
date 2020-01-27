import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'



const Note = ({ note }) => {

  return(
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {note.title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{note.body}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}


export default Note