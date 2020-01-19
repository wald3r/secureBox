import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { BrowserRouter as Link } from 'react-router-dom'




const Footer = (props) => {

  const inlineStyle = {
    textAlign: 'right'
  }

  const handleLogout = () => {
    props.removeUser()
    props.handleNotification('Logout successfull!', 5000)

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