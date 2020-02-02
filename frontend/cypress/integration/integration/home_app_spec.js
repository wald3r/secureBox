
describe('Home ', function () {

  beforeEach(function(){
    cy.visit('http://localhost:3000/')
    cy.get('#username')
      .type('admin')
    cy.get('#password')
      .type('admin')
    cy.get('#login')
      .click()

    cy.contains('admin is logged in')
  })

  it('switch to login', function(){
    cy.visit('http://localhost:3000/')
    cy.contains('Login')
      .should('not.exist')
  })

  it('switch to registration', function(){
    cy.visit('http://localhost:3000/registration')
    cy.contains('E-Mail:')
      .should('not.exist')
  })

  it('switch to upload', function(){
    cy.visit('http://localhost:3000/upload')
    cy.contains('Settings')

  })

  it('switch to files', function(){
    cy.visit('http://localhost:3000/allfiles')
    cy.contains('Filter')
  })


  it('switch to notes', function(){
    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter')
  })

  it('switch to profile', function(){
    cy.visit('http://localhost:3000/profile')
    cy.contains('Change user details')

  })

  it('switch to admin', function(){
    cy.visit('http://localhost:3000/admin')
    cy.contains('MIME-Types')
  
  })

 

})