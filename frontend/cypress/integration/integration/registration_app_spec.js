
describe('Registration ', function () {

  beforeEach(function() {
    cy.visit('http://localhost:3000/app/registration')
  })

  it('registration page can be opened', function(){
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Register')
  })

  it('register in app', function(){
    cy.get('#name')
      .type('test')
    cy.get('#username')
      .type('test')
    cy.get('#email')
      .type('test@test.com')
    cy.get('#password1')
      .type('test')
    cy.get('#password2')
      .type('test')
    cy.get('#register')
      .click()
    cy.contains('Please follow the link in the email to activate your account.')
  })

  it('switch to login', function(){
    cy.visit('http://localhost:3000/app/registration')
    cy.contains('E-Mail:')
  })


  it('switch to registration', function(){
    cy.visit('http://localhost:3000/')
    cy.get('#login')
      .contains('Login')
  })

  it('switch to upload', function(){
    cy.visit('http://localhost:3000/app/upload')
    cy.contains('Click Me Or Drop It Here.')
      .should('not.exist')
  })

  it('switch to files', function(){
    cy.visit('http://localhost:3000/app/allfiles')
    cy.contains('Filter')
      .should('not.exist')
  })


  it('switch to notes', function(){
    cy.visit('http://localhost:3000/app/notes')
    cy.contains('Filter')
      .should('not.exist')
  })

  it('switch to profile', function(){
    cy.visit('http://localhost:3000/app/profile')
    cy.contains('Change user details')
      .should('not.exist')
  })

  it('switch to admin', function(){
    cy.visit('http://localhost:3000/app/admin')
    cy.contains('MIME-Types')
      .should('not.exist')
  })
})