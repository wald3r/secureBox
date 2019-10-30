import React, { useState } from 'react'
import loginService from './services/login'

const App = ( ) => {

  const [ user, setUser ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login with: ', username, password)
    const newUser = await loginService.login({ username, password })
    if(newUser !== undefined){
      setUser(newUser)
    }

    setPassword('')
    setUsername('')
  }


  if (user === null){
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>Username: <input onChange={({ target }) => setUsername(target.value)}/></div>
          <div>Password: <input onChange={({ target }) => setPassword(target.value)} /></div>
          <div><button type="submit">Login</button></div>
        </form>
      </div>
    )
  }else{
    return(
      <div>
        Hello
      </div>
    )
  }

}

export default App