import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { setUser, removeUser } from './reducers/userReducer'
import { handleNotification } from './reducers/notificationReducer'
import { getFiles } from './reducers/filesReducer'
import { getTypes } from './reducers/mimetypesReducer'
import Login from './components/Login'
import Registration from './components/Registration'
import Notification from './components/Notificiation'
import Home from './components/Home'
import Upload from './components/Upload'
import Error from './components/Error'
import AllFiles from './components/AllFiles'
import Profile from './components/Profile'
import Admin from './components/Admin'
import Footer from './components/Footer'
import Notes from './components/Notes'
import './stylesheets/general.css'
import { getUsers } from './reducers/usersReducer'
import { getNotes } from './reducers/notesReducer'

const App = ( props ) => {
  //window.localStorage.removeItem('loggedappUser')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      props.setUser(newUser)
      props.getTypes()
      props.getNotes()
      if(newUser.role === 'admin'){
        props.getUsers(newUser)
      }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])



  
  if (props.user === null){
    return (
      <div className='bg'>
      <Error />
      <Notification />
      <div className='container2'>
      <div className='row'>
      <div className='col-md-15'>
        <Router>
        <div className='header'>SecureBox</div>
        <br></br>
          <Link className='link' to='/'>Login</Link>
          <Link className='link' to='/app/registration'>Registration</Link>  
          <br></br>
          <Route exact path='/' render={() => <Login/> } />
          <Route exact path='/app/registration' render={() => <Registration /> } />
        </Router>
      </div>
      </div>
      </div>
      </div>
    )
  }else{
    const priorityStyle = { display: props.user.role === 'admin' ? '' : 'none' }
    return(
      <div className='bg1'>
        <Error />
        <Notification />
        <Router>
        <div className='container3'>
          <div className='row'>
            <div className='col-md-18'>
                <div className='header'>SecureBox</div>
                <br></br>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/app/upload'>Upload</Link>
                <Link className='link' to='/app/allfiles'>Files</Link>
                <Link className='link' to='/app/notes'>Notes</Link>
                <Link className='link' to ='/app/profile'>Profile</Link>
                <Link style={priorityStyle} className='link' to='/app/admin'>Admin</Link>
        
                
                <Route exact path='/' render={() => <Home /> }/>
                <Route exact path='/app/upload' render={(props) => <Upload {...props}/> } />
                <Route exact path='/app/allfiles' render={(props) => <AllFiles {...props}/> } />
                <Route exact path='/app/notes' render={(props) => <Notes {...props}/> } />
                <Route exact path='/app/profile' render={(props) => <Profile {...props}/> } />
                <Route exact path='/app/admin' render={(props) => <Admin {...props}/> } />
              <br></br>
              <br></br>
              </div>
            </div>

          </div>
          <br></br>
          <Footer />

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
  removeUser,
  handleNotification,
  getFiles,
  getTypes,
  getUsers,
  getNotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)