import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { setUser, removeUser } from './reducers/userReducer'
import Login from './components/Login'
import Registration from './components/Registration'


const App = ( props ) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      props.setUser(newUser)
    }
  }, [])

  const handleLogout = () => {
    props.removeUser()
  }

  if (props.user === null){
    return (

      <Router>
      <Route exact path='/' render={() => <Login/> } />
      <Route exact path='/Registration' render={() => <Registration /> } />
      </Router>
    )
  }else{
    return(
      <div>
         <div><button type="submit" onClick={handleLogout}>Logout</button></div>
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
  removeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)