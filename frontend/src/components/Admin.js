import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import usersService from '../services/users'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import { changeUser } from '../reducers/usersReducer'

const Admin = (props) => {



  if(props.user.role !== 'admin'){
    return null
  }

  const priorityStyle = { display: props.user.role === 'admin' ? 'none' : '' }

  const handleRole = async (id) => {
    const response = await usersService.changeRole(id)
    if(response.status === 200){
      props.handleNotification('Role changed', 5000)
      props.changeUser(response.data)
    }
    else{
      props.handleError('Role did not change', 5000)
    }

  }

  return (

    <div className='container'>
          <div className='row'>
            <div className='col-md-15'>
              <Table className='table'>
                <thead className='thead-dark'>
                  <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Mail</th>
                    <th>Role</th>
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
                      <td>{user.password}</td>
                      <td style={priorityStyle}><Button onClick={() => handleRole(user._id)}>Change Role</Button></td>

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


