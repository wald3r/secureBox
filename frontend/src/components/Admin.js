import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import usersService from '../services/users'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'

const Admin = (props) => {



  if(props.user.role !== 'admin'){
    return null
  }

  
  const handleRole = async (id) => {
    console.log('Change role of', id)
    const response = await usersService.changeRole(id)
    if(response.status === 200){
      props.handleNotification('Role changed', 5000)
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
                      <td><Button onClick={() => handleRole(user._id)}>Change Role</Button></td>

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
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = {
  handleNotification,
  handleError,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)


