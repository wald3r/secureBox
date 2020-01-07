import React, { useState } from 'react'
import registrationService from '../services/registration'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import '../stylesheets/general.css'



const Registration = (props) => {



  const [ newname, setNewname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ newpwd1, setNewpwd1 ] = useState('')
  const [ newpwd2, setNewpwd2 ] = useState('')
  const [ name, setName ] = useState('')

  const handleRegistration =  async (event) => {
    event.preventDefault()
    try{
      if(newpwd1 === newpwd2){
        await registrationService.register({ username: newname, password: newpwd1, name: name, email: email })
        props.handleNotification('Registration successfull', 5000)
        setNewname('')
        setEmail('')
        setNewpwd1('')
        setNewpwd2('')
        setName('')
      }else{
        props.handleError('Passwords do not match', 5000)
      }
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, 5000)
      }
      else if(error.request){
        props.handleError(error.request.data, 5000)
      }else{
        props.handleError(error.message, 5000)
      }
      console.error(error)
    }
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
                          <input autoComplete='off' required onChange={({ target }) => setNewname(target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td width="10">
                            E-Mail:
                        </td>

                        <td>
                          <input autoComplete='off' required onChange={({ target }) => setEmail(target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td width="10">
                            Password:
                        </td>

                        <td>
                          <input autoComplete='off' type='password' required onChange={({ target }) => setNewpwd1(target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td width="10">
                            Repeat Password:
                        </td>

                        <td>
                          <input autoComplete='off' type='password' required onChange={({ target }) => setNewpwd2(target.value)} />
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

const mapDispatchToProps = {
  handleNotification,
  handleError
}

export default connect(null, mapDispatchToProps)(Registration)
