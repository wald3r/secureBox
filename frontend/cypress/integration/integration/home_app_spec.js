
describe('Home ', function () {

  beforeEach(function(){
    cy.resetDb()
    cy.addAdmin()
    cy.loginAdmin()
  })

  it('switch to login', function(){
    cy.visit('http://localhost:3000/')
    cy.contains('Login')
      .should('not.exist')
  })

  it('switch to registration', function(){
    cy.visit('http://localhost:3000/app/registration')
    cy.contains('E-Mail:')
      .should('not.exist')
  })

  it('switch to upload', function(){
    cy.visit('http://localhost:3000/app/upload')
    cy.contains('Settings')

  })

  it('switch to files', function(){
    cy.visit('http://localhost:3000/app/allfiles')
    cy.contains('Filter')
  })


  it('switch to notes', function(){
    cy.visit('http://localhost:3000/app/notes')
    cy.contains('Filter')
  })

  it('switch to profile', function(){
    cy.visit('http://localhost:3000/app/profile')
    cy.contains('Change user details')

  })

  it('switch to admin', function(){
    cy.visit('http://localhost:3000/app/admin')
    cy.contains('MIME-Types')
  
  })

  afterEach(function(){
    cy.logout()
  })
 

})