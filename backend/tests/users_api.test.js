/* eslint-disable no-undef */
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/testHelper')
const bcrypt = require('bcrypt')



describe('test get user api', () => {


  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash1 = await bcrypt.hash('testpassword1', 10)
    const passwordHash2 = await bcrypt.hash('testpassword2', 10)
    const passwordHash3 = await bcrypt.hash('testpassword3', 10)
    const passwordHash4 = await bcrypt.hash('testpassword4', 10)

    const user1 = new User({role: 'admin', active: true, username: 'testusername1', name: 'testname1', password: passwordHash1, email: 'testmail'})
    const user2 = new User({active: true, username: 'testusername2', name: 'testname2', password: passwordHash2, email: 'testmail'})
    const user3 = new User({username: 'testusername3', name: 'testname3', password: passwordHash3, email: 'testmail'})
    const user4 = new User({username: 'testusername4', name: 'testname4', password: passwordHash4, email: 'testmail'})
      
    await user1.save()
    await user2.save()
    await user3.save()
    await user4.save()
  })

  test('test get users', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test
    const users = await helper.getUser()

    let rusers
    await api
      .get('/api/users')
      .set('Authorization', 'Bearer ' +user.token)
      .then(response => rusers = response.body) 

    expect(rusers.length).toBe(users.length)
  })

  test('test get users when not authenticated', async () => {

    let message
    await api
      .get('/api/users')
      .expect(401)
      .then(response => message = response.text) 

    expect(message).toBe('Not Authenticated')
  })

  test('test get users when not admin', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername2',
      password: 'testpassword2',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    let message
    await api
      .get('/api/users')
      .set('Authorization', 'Bearer ' +user.token)
      .expect(401)
      .then(response => message = response.text) 

    expect(message).toBe('Wrong user role')
  })

  test('test verify password positively', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    let message
    await api
      .put(`/api/users/check/${user.id}`)
      .set('Authorization', 'Bearer ' +user.token)
      .send({password: 'testpassword1'})
      .expect(200)
      .then(response => message = response.text) 

    expect(message).toBe('Old password correct')
  })

  test('test verify password negatively', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    let message
    await api
      .put(`/api/users/check/${user.id}`)
      .set('Authorization', 'Bearer ' +user.token)
      .send({password: 'testpassword2'})
      .expect(400)
      .then(response => message = response.text) 

    expect(message).toBe('Old password incorrect')
  })

  test('test changing password positively', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    let ruser
    await api
      .put(`/api/users/password/${user.id}`)
      .set('Authorization', 'Bearer ' +user.token)
      .send({password: 'testpassword2'})
      .expect(200)
      .then(response => ruser = response.body) 

    expect(ruser.username).toBe('testusername1')

    //login again
    const changedUser = {
      username: 'testusername1',
      password: 'testpassword2',
    }
    await api
      .post('/api/login')
      .send(changedUser)
      .expect(200)
  })


  test('test changing password negatively', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    await api
      .put(`/api/users/password/${user.id}`)
      .set('Authorization', 'Bearer ' +user.token)
      .send({password: null})
      .expect(500)
     

    //login again

    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
  })

  test('test get single user', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    const users = await helper.getUser()

    let ruser
    await api
      .get(`/api/users/user/${users[1].id}`)
      .set('Authorization', 'Bearer ' +user.token)
      .expect(200)
      .then(response => ruser = response.body)

    expect(ruser.id).toBe(users[1].id)
    
  })

  test('test to get not single user - bad id', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test  
    let message
    await api
      .get('/api/users/user/1}')
      .set('Authorization', 'Bearer ' +user.token)
      .expect(500)
      .then(response => message = response.text)
    expect(message).toBe('User does not exist')
    
  })


  test('test to get not single user - not existing', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //get valid object id
    const passwordHash5 = await bcrypt.hash('testpassword5', 10)
    const user5 = new User({username: 'testusername5', name: 'testname5', password: passwordHash5, email: 'testmail'})
    await user5.save()

    let validId = user5._id
    await User.findByIdAndDelete(validId)
    //then test  

    let message
    await api
      .get(`/api/users/user/${validId}`)
      .set('Authorization', 'Bearer ' +user.token)
      .expect(500)
      .then(response => message = response.text)
    expect(message).toBe('User does not exist')
    
  })


  test('test update user', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //user to update
    user.username = 'test'
    user.email = 'test'
    user.active = false
    user.role = 'user'
    user.name = 'test'

    //then test 
    let ruser
    await api
      .put(`/api/users/details/${user.id}`)
      .set('Authorization', 'Bearer ' +user.token)
      .send(user)
      .expect(200)
      .then(response => ruser = response.body)

    expect(ruser.username).toBe('test')
    expect(ruser.email).toBe('test')
    expect(ruser.active).toBe(false)
    expect(ruser.role).toBe('user')
    expect(ruser.name).toBe('test')
    
  })

  test('test not update user', async () => {

    //authenticate first
    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let user
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

    //then test 
    let message
    await api
      .put(`/api/users/details/${user.id}1`)
      .set('Authorization', 'Bearer ' +user.token)
      .send(user)
      .expect(500)
      .then(response => message = response.text)
      
    expect(message).toBe('User does not exist')

  })

  afterAll(async () => {
    mongoose.connection.close()
  })
})