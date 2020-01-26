import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import parameter from '../utils/parameter'
import '../stylesheets/general.css'



const Footer = (props) => {

  const handleLogout = () => {
    props.removeUser()
    props.handleNotification('Logout successfull!', parameter.notificationTime)

  }


  return (
    <div className='footer'>
      {props.user.username} is logged in! <a href='/' onClick={handleLogout}>Logout</a>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  removeUser,
  handleNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)