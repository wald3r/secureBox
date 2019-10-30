import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import registrationService from './services/registration'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ( ) => {

  const [ user, setUser ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ newname, setNewname ] = useState('')
  const [ newpwd, setNewpwd ] = useState('')
  const [ name, setName ] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      setUser(newUser)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login with: ', username, password)
    const newUser = await loginService.login({ username, password })
    if(newUser !== undefined){
      setUser(newUser)
      window.localStorage.setItem('loggedappUser', JSON.stringify(newUser))
    }
    setPassword('')
    setUsername('')
  }


  const handleRegistration =  async (event) => {
    event.preventDefault()
    console.log('register:', newname, newpwd, name)
    await registrationService.register({ username: newname, password: newpwd, name: name })
    setNewname('')
    setNewpwd('')
    setName('')
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (user === null){
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>Username: <input onChange={({ target }) => setUsername(target.value)}/></div>
          <div>Password: <input onChange={({ target }) => setPassword(target.value)} /></div>
          <div><button type="submit">Login</button></div>
        </form>
        <form onSubmit={handleRegistration}>
          <div>Name: <input onChange={({ target }) => setName(target.value)}/></div>
          <div>Username: <input onChange={({ target }) => setNewname(target.value)} /></div>
          <div>Password: <input onChange={({ target }) => setNewpwd(target.value)} /></div>
          <div><button type="submit">Login</button></div>
        </form>
      </div>
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