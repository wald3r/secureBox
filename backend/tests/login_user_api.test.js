const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/testHelper')



describe('test login user api', () => {


  beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({username: 'testusername', name: 'testname', password: 'testpassword'})
    
      await api
        .post('/api/registration')
        .send(user)
        .expect(200)
  
  })

  test('login with user', async () => {

    const users = await helper.getUser()
    const newUser = {
      username: 'testusername',
      password: 'testpassword',
    }

    const response = await api
      .post('/api/login')
      .send(newUser)
      .expect(200) 
     console.log(response.req)
     expect(response.req).toBe('testusername')
  })

  afterAll(async () => {
    mongoose.connection.close()
  })
})