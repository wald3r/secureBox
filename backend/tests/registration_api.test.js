/* eslint-disable no-undef */
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/testHelper')
const bcrypt = require('bcrypt')
const Registration = require('../models/registration')
const cryptoHelper = require('../utils/cryptoHelper.js')



describe('test add user api', () => {


  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({username: 'testusername', name: 'testname', password: passwordHash, email: 'walder2@gmx.at', active: true})
    await user.save()
  })


  test('creation fails with an invalid username - minlength', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'da',
      name: 'Daniel Walder',
      password: 'walder',
      email: 'testmail',
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
      email: 'testmail',
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
      email: 'testmail',
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
      email: 'testmail',
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
      email:'testmail@mail.com',
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
      email: 'testmail',
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
      password: 1,
      email: 'testmail',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with a missing email - required', async () => {
    const usersAtStart = await helper.getUser()

    const newUser = {
      username: 'daniel',
      name: 'Daniel Walder',
      password: 'testpassword',
    }

    await api
      .post('/api/registration')
      .send(newUser)
      .expect(500)
    
    const usersAtEnd = await helper.getUser()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })


  test('test registration verification', async () => {

    const newUser = new User({
      username: 'daniel',
      name: 'Daniel Walder',
      password: 'testpassword',
      email: 'test',
    })
    const savedUser = await newUser.save()

    const registration = new Registration({
      userid: savedUser._id,
      hash: cryptoHelper.createRandomHash()
    })
    await registration.save()


    let message
    await api
      .get(`/api/registration/verify/${registration.hash}`)
      .expect(200)
      .then(response => message = response.text)
    
    expect(message).toBe('User got activated.')
  })

  test('test registration verification - failed', async () => {

    let message
    await api
      .get(`/api/registration/verify/${cryptoHelper.createRandomHash()}`)
      .expect(500)
      .then(response => message = response.text)
    
    expect(message).toBe('Activation did not work. Please contact the administrator.')
  })

  afterAll(async () => {
    mongoose.connection.close()
  })
})