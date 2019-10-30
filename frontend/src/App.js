import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'


const App = ( ) => {

  const [ user, setUser ] = useState(null)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      setUser(newUser)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
  }

  const handleUser = ( newUser ) => {
    setUser(newUser)
  }

  if (user === null){
    return (

      <Router>
      <Route exact path='/' render={() =>
          <Login
              handleUser={handleUser}
          /> } />
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

export default App