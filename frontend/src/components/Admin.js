import React, { useState } from 'react'
import '../stylesheets/general.css'
import { Tab, Tabs } from 'react-bootstrap'
import AllUsers from './AllUsers'
import Mimetypes from './Mimetypes'
import { connect } from 'react-redux' 
import { getUsers } from '../reducers/usersReducer'
import { getTypes } from '../reducers/mimetypesReducer'

const Admin = (props) => {

  const [chosenType, setChosenType] = useState('Users')

  console.log(props.user.role)
  if(props.user.role !== 'admin'){
    return null
  }

  const handleTypeChange = (e) => {
    setChosenType(e)
    if(e === 'Users'){
      props.getUsers(props.user)
    }else if (e === 'Mimetypes'){
      props.getTypes()
    }
  }

  return (
    <div className='container'>
       <div style={{ textAlign: 'center' }}>
            <Tabs id="controlled-tab-example" activeKey={chosenType} onSelect={handleTypeChange}>
              <Tab eventKey="Users" id='idUsers' title="Users">
                <AllUsers />
              </Tab>
              <Tab eventKey="Mimetypes" id='idMimes' title="MIME-Types">
                <Mimetypes />
              </Tab>
            </Tabs>
          </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = {
  getUsers,
  getTypes,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)


