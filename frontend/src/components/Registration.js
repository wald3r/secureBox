import React, { useState } from 'react'
import registrationService from '../services/registration'
import { Button, Form } from 'react-bootstrap'
import '../stylesheets/general.css'



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

    <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <Form onSubmit={handleRegistration}>
            <table className='table .table-striped' width="10">
                <thead className='thead-dark'>

                </thead>
                <tbody width="10">
                    <tr>
                        <td width="10">
                            Name:
                        </td>

                        <td>
                          <input autoComplete='off' onChange={({ target }) => setName(target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td width="10">
                            Username:
                        </td>

                        <td>
                          <input autoComplete='off' onChange={({ target }) => setName(target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td width="10">
                            Password:
                        </td>

                        <td>
                          <input autoComplete='off' type='password' onChange={({ target }) => setNewpwd(target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div><Button className='button' type="submit">Register</Button></div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Registration
