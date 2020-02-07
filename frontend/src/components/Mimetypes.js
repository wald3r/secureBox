import React, { useState } from 'react'
import '../stylesheets/general.css'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import AddMime from './AddMime'
import { removeType } from '../reducers/mimetypesReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import mimesService from '../services/mimes'
import Confirmation from './Confirmation'


const Mimetypes = (props) => {

  const [showAddMime, setShowAddMime] = useState(false)
  const [filter, setFilter] = useState('')
  const [type, setType] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const filteredMimes = filter === '' ? props.mimetypes : props.mimetypes.filter(m => m.name.includes(filter))

  const removeMime = async () => {
    try{
      const response = await mimesService.removeType(type.id)
      props.removeType(type)
      props.handleNotification(response.data, parameter.notificationTime)
    }catch(error){
      exception.catchException(error, props)
    }
  }

  const handleRemoval = (mime) => {
    setType(mime)
    setShowConfirmation(true)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return(
    <div className='container'>
      <Confirmation
        showConfirmation={showConfirmation}
        setConfirmation={setShowConfirmation}
        handleConfirmation={removeMime}
      />
      <AddMime
        showAddMime={showAddMime}
        handleShowAddMime={setShowAddMime}/>
      <Table responsive className='table table-hover'>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Ending</th>
            <th><input onChange={handleFilter}/></th>
          </tr>
        </thead>
        <tbody>
          {filteredMimes.map(type =>
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.ending}</td>
              <td><Button id='idDeleteMime' data-toggle='tooltip' data-placement='top' title='Delete type' onClick={() => handleRemoval(type)}><i className="fa fa-trash"></i></Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button id='idAddMime' onClick={() => setShowAddMime(true)}>Add new MimeType</Button>
      <br></br>
      <br></br>
      <p style={{ textAlign: 'left' }}><b>Allowed MIME-Types to upload files.</b></p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    mimetypes: state.mimetypes,
  }
}

const mapDispatchToProps = {
  removeType,
  handleError,
  handleNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Mimetypes)