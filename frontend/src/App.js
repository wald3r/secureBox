import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { setUser, removeUser } from './reducers/userReducer'
import { handleNotification } from './reducers/notificationReducer'
import Login from './components/Login'
import Registration from './components/Registration'
import Notification from './components/Notificiation'
import Error from './components/Error'

const App = ( props ) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      props.setUser(newUser)
    }
  }, [])

  const padding = { padding: 5 }

  const handleLogout = () => {
    props.removeUser()
    props.handleNotification('Logout successfull!', 5000)

  }

  if (props.user === null){
    return (
      <div>
        <Error />
        <Notification />
        <Router>
          <div>
            <h1>SecureBox</h1>
            <Link style={padding} to='/'>Login</Link>
            <Link style={padding} to='/registration'>Registration</Link>
          </div>
          <br></br>
          <Route exact path='/' render={() => <Login/> } />
          <Route exact path='/registration' render={() => <Registration /> } />
        </Router>
      </div>
    )
  }else{
    return(
      <div>
        <Error />
        <Notification />
        <Router>
          <div>
            <h1>SecureBox</h1>
            {props.user.username} is logged in <button onClick={handleLogout}>Logout</button>
          </div>
          <br></br>
        </Router>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  setUser,
  removeUser,
  handleNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)