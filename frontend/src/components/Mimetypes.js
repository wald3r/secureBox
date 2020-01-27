import React, {useState} from 'react'
import '../stylesheets/general.css'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import AddMime from './AddMime'
import { removeType } from '../reducers/mimetypesReducer'
import parameter from '../utils/parameter'
import exception from '../utils/exception'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'

const Mimetypes = (props) => {

  const [showAddMime, setShowAddMime] = useState(false)

  const handleRemoval = async (type) => {
    try{
      await props.removeType(type)
      props.handleNotification('Type was successfully deleted!', parameter.notificationTime)
    }catch(error){
      exception.catchException(error, props)
    }  
  }

  return(
    <div className='container'> 
      <AddMime
        showAddMime={showAddMime} 
        handleShowAddMime={setShowAddMime}/>
      <Table className='table table-hover'>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Ending</th>
          </tr>
        </thead>
        <tbody>
          {props.mimetypes.map(type =>
          <tr key={type.id}>
            <td>{type.name}</td>
            <td>{type.ending}</td>
            <td><Button data-toggle='tooltip' data-placement='top' title='Delete type.' onClick={() => handleRemoval(type)}><i className="fa fa-trash"></i></Button></td>
          </tr>
          )}
        </tbody>
      </Table>
      <Button onClick={() => setShowAddMime(true)}>Add new MimeType</Button>
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