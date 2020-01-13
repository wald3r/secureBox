const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')



describe('test login user api', () => {


  beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('testpassword', 10)
      const user = new User({username: 'testusername', name: 'testname', password: passwordHash, email: 'walder2@gmx.at', active: true})
      await user.save()
    /*  await api
        .post('/api/registration')
        .send(user)
        .expect(200)
  
      console.log(user)
*/
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
      .then(response => response_message = response.text)

    expect(response_message).toBe('invalid username or password')
  })

  test('login with inactive user', async () => {

    const passwordHash = await bcrypt.hash('testpassword1', 10)
    const user = new User({username: 'testusername1', name: 'testname', password: passwordHash, email: 'walder2@gmx.at'})
    await user.save()

    const newUser = {
      username: 'testusername1',
      password: 'testpassword1',
    }
    let response_message
     await api
      .post('/api/login')
      .send(newUser)
      .expect(401)
      .then(response => response_message = response.text)

    expect(response_message).toBe('not active')
  })


  afterAll(async () => {
    mongoose.connection.close()
  })
})