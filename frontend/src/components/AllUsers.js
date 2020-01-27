import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { removeUser } from '../reducers/usersReducer'
import { getUsers } from '../reducers/usersReducer'
import ChangeUser from './ChangeUser'
import ChangePassword from './ChangePassword'
import usersService from '../services/users'
import exception from '../utils/exception'
import parameter from '../utils/parameter'


const AllUsers = (props) => {

  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [user, setUser] = useState(null)

  if(props.user.role !== 'admin'){
    return null
  }

  const priorityStyle = { display: props.user.role === 'admin' ? '' : 'none' }

  const handleUserChange = (user) => {
    setUser(user)
    setShowUserDialog(true)

  }

  const handlePasswordChange = (user) => {
    setUser(user)
    setShowPasswordDialog(true)
  }

  const handleRemoval = async (userToDelete) => {

    try{
      const response = await usersService.deleteUser(userToDelete.id)
      props.getUsers(props.user)
      props.handleNotification(response.data, parameter.notificationTime)
    }catch(error){
      exception.catchException(error, props)
    }
  }

  return (

    <div className='container'>
              <ChangeUser showDialog={showUserDialog}
                          handleShowDialog={setShowUserDialog}
                          user={user}/>
              <ChangePassword showDialog={showPasswordDialog}
                          handleShowDialog={setShowPasswordDialog}
                          user={user}/>
              <Table responsive className='table table-hover'>
                <thead className='thead-dark'>
                  <tr>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Mail</th>
                    <th>Role</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {props.users.map(u =>
                    <tr key={u.id}>
                      <td>{u.username}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>{u.active.toString()}</td>
                      <td style={priorityStyle}>
                        <Button data-toggle='tooltip' data-placement='top' title='Edit profile' onClick={() => handleUserChange(u)}><i className="fa fa-drivers-license-o	" /></Button>
                        <Button data-toggle='tooltip' data-placement='top' title='Change password' onClick={() => handlePasswordChange(user)}><i className="fa fa-lock	"/></Button>
                        <Button data-toggle='tooltip' data-placement='top' title='Remove user' onClick={() => handleRemoval(u)}><i className="fa fa-trash" /></Button>
                      </td>

                    </tr>
                  ) }
                </tbody>
              </Table>

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
  removeUser,
  getUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)


