import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import parameter from '../utils/parameter'



const Footer = (props) => {

  const inlineStyle = {
    textAlign: 'right'
  }

  const handleLogout = () => {
    props.removeUser()
    props.handleNotification('Logout successfull!', parameter.notificationTime)

  }


  return (
    <div style={inlineStyle}>
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