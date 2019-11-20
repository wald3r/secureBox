const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



describe('test login user api', () => {


  beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({username: 'testusername', name: 'testname', password: 'testpassword'})
    
      await api
        .post('/api/registration')
        .send(user)
        .expect(200)
  
  })

  test('login with existing user', async () => {

    const newUser = {
      username: 'testusername',
      password: 'testpassword',
    }

     let user
     await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .then(response => user = response.body) 

     expect(user.username).toBe('testusername')
     expect(user.name).toBe('testname')
  })

  test('login with nonexisting user', async () => {

    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let response_message
     await api
      .post('/api/login')
      .send(newUser)
      .expect(401)
      .then(response => response_message = response.body.error)

    expect(response_message).toBe('invalid username or password')
  })


  afterAll(async () => {
    mongoose.connection.close()
  })
})