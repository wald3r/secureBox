import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { changeUser } from '../reducers/usersReducer'
import ChangeUser from './ChangeUser'
import ChangePassword from './ChangePassword'


const Admin = (props) => {

  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [user, setUser] = useState(null)

  if(props.user.role !== 'admin'){
    return null
  }

  const priorityStyle = { display: props.user.role === 'admin' ? '' : '' }

  const handleUserChange = (user) => {
    setUser(user)
    setShowUserDialog(true)

  }

  const handlePasswordChange = (user) => {
    setUser(user)
    setShowPasswordDialog(true)
  }

  return (

    <div className='container'>
          <div className='row'>
            <div className='col-md-15'>
              <ChangeUser showDialog={showUserDialog}
                          handleShowDialog={setShowUserDialog}
                          user={user}/>
              <ChangePassword showDialog={showPasswordDialog}
                          handleShowDialog={setShowPasswordDialog}
                          user={user}/>
              <Table className='table'>
                <thead className='thead-dark'>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Mail</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {props.users.map(user =>
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.active.toString()}</td>
                      <td>{user.password}</td>
                      <td style={priorityStyle}><Button onClick={() => handleUserChange(user)}>Edit Profile</Button></td>
                      <td style={priorityStyle}><Button onClick={() => handlePasswordChange(user)}>Edit Password</Button></td>

                    </tr>
                  ) }
                </tbody>
              </Table>
            </div>
          </div>
        </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  handleNotification,
  handleError,
  changeUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)


