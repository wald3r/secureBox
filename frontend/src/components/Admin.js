import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'



const Admin = (props) => {


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
                    <th>E-Mail</th>
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
                      <td>{user.password}</td>
                    </tr>
                  )}
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
  }
}

export default connect(mapStateToProps)(Admin)
