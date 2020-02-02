

describe('Login ', function () {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function(){
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  it('login in app', function(){
    cy.get('#username')
      .type('admin')
    cy.get('#password')
      .type('admin')
    cy.get('#login')
      .click()
    cy.contains('admin is logged in')
  })


  it('switch to registration', function(){
    cy.visit('http://localhost:3000/registration')
    cy.contains('E-Mail:')
  })

  it('switch to upload', function(){
    cy.visit('http://localhost:3000/upload')
    cy.contains('Click Me Or Drop It Here.')
      .should('not.exist')
  })

  it('switch to files', function(){
    cy.visit('http://localhost:3000/allfiles')
    cy.contains('Filter')
      .should('not.exist')
  })


  it('switch to notes', function(){
    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter')
      .should('not.exist')
  })

  it('switch to profile', function(){
    cy.visit('http://localhost:3000/profile')
    cy.contains('Change user details')
      .should('not.exist')
  })

  it('switch to admin', function(){
    cy.visit('http://localhost:3000/admin')
    cy.contains('MIME-Types')
      .should('not.exist')
  })
})