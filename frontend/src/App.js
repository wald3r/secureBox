import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { setUser, removeUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { handleNotification } from './reducers/notificationReducer'
import { getFiles } from './reducers/filesReducer'
import Login from './components/Login'
import Registration from './components/Registration'
import Notification from './components/Notificiation'
import Home from './components/Home'
import Upload from './components/Upload'
import Error from './components/Error'
import { Button } from 'react-bootstrap'
import AllMyFiles from './components/AllMyFiles'
import Profile from './components/Profile'
import Admin from './components/Admin'
import './stylesheets/general.css'


const App = ( props ) => {
  //window.localStorage.removeItem('loggedappUser')
  useEffect(() => {
    props.getUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      props.setUser(newUser)
      props.getFiles()
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
          <div className='container'>
            <div className='row'>
              <div className='col-md-15'>
                <h1>SecureBox</h1>
                <Link style={padding} to='/'>Login</Link>
                <Link style={padding} to='/registration'>Registration</Link>
              </div>
            </div>
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
          <div className='container'>
            <div className='row'>
              <div className='col-md-15'>
                <h1 className='title'>SecureBox</h1>
                <Link style={padding} to='/'>Home</Link>
                <Link style={padding} to='/upload'>Upload</Link>
                <Link style={padding} to='/myfiles'>Files</Link>
                <Link style={padding} to='/profile'>Profile</Link>
                <Link style={padding} to='/admin'>Admin</Link>
                {props.user.username} is logged in <Button onClick={handleLogout}>Logout</Button>
              </div>
            </div>
          </div>
          <br></br>
          <Route exact path='/' render={() => <Home /> } />
          <Route exact path='/upload' render={(props) => <Upload {...props}/> } />
          <Route exact path='/myfiles' render={(props) => <AllMyFiles {...props}/> } />
          <Route exact path='/profile' render={(props) => <Profile {...props}/> } />
          <Route exact path='/admin' render={(props) => <Admin {...props}/> } />
        </Router>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  setUser,
  getUsers,
  removeUser,
  handleNotification,
  getFiles
}

export default connect(mapStateToProps, mapDispatchToProps)(App)