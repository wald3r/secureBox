import React, { useState } from 'react'
import loginService from './services/login'

const App = (props) => {

  const [user, setUser] = useState(null)
  const [ name, setName ] = useState(null)
  const [ password, setPassword ] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login', name, password)
    const newUser = await loginService.login(name, password)
    console.log(newUser)
    if(newUser !== undefined){
      setUser(newUser)
    }
    setPassword(null)
    setName(null)
  }


  if (user === null){
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>Username: <input onChange={({ target }) => setName(target.value)}/></div>
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