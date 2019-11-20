const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/testHelper')



describe('test get user api', () => {


  beforeEach(async () => {
      await User.deleteMany({})
      const user1 = new User({username: 'testusername1', name: 'testname1', password: 'testpassword1'})
      const user2 = new User({username: 'testusername2', name: 'testname2', password: 'testpassword2'})
      const user3 = new User({username: 'testusername3', name: 'testname3', password: 'testpassword3'})
      const user4 = new User({username: 'testusername4', name: 'testname4', password: 'testpassword4'})
      
      await api
        .post('/api/registration')
        .send(user1)
        .expect(200)

      await api
        .post('/api/registration')
        .send(user2)
        .expect(200)

      await api
        .post('/api/registration')
        .send(user3)
        .expect(200)

      await api
        .post('/api/registration')
        .send(user4)
        .expect(200)
  })

  test('test get users', async () => {


    const users = await helper.getUser()
    let rusers
    await api
      .get('/api/users')
      .then(response => rusers = response.body) 

     expect(rusers.length).toBe(users.length)
  })


  afterAll(async () => {
    mongoose.connection.close()
  })
})