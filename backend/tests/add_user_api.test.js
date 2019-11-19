const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/testHelper')


describe('test add user api', () => {


  beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({username: 'testusername', name: 'testname', password: 'testpassword'})
      await user.save()
  })


  test('creation fails with an invalid username - minlength', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'da',
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with an invalid username - required', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with an invalid username - string', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 1,
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length)
  })


  test('creation fails with an invalid username - uniqueness', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'testusername',
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation valid user', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'daniel',
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(200)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length+1)
  })


  test('creation fails with an invalid password - required', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'daniel',
      name: 'Daniel Walder',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with an invalid password - string', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'daniel',
      name: 'Daniel Walder',
      password: 1
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
     expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  afterAll(async () => {
    mongoose.connection.close()
  })
})