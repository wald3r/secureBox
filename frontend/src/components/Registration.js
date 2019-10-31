import React, { useState } from 'react'
import registrationService from '../services/registration'
import { Button } from 'react-bootstrap'



const Registration = () => {


  const [ newname, setNewname ] = useState('')
  const [ newpwd, setNewpwd ] = useState('')
  const [ name, setName ] = useState('')

  const handleRegistration =  async (event) => {
    event.preventDefault()
    console.log('register:', newname, newpwd, name)
    await registrationService.register({ username: newname, password: newpwd, name: name })
    setNewname('')
    setNewpwd('')
    setName('')
  }

  return(
    <div>
      <form onSubmit={handleRegistration}>
        <div>Name: <input onChange={({ target }) => setName(target.value)}/></div>
        <div>Username: <input onChange={({ target }) => setNewname(target.value)} /></div>
        <div>Password: <input onChange={({ target }) => setNewpwd(target.value)} /></div>
        <div><Button type="submit">Register</Button></div>
      </form>
    </div>
  )
}

export default Registration
