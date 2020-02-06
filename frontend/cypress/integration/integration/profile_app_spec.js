describe('Profile', function(){



  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.resetDb()
    cy.addAdmin()
    cy.loginAdmin()
    cy.visit('http://localhost:3000/app/profile')
  })


  it('Open profile', function(){
    cy.contains('Change user details')
  })


  it('Change user details', function(){
    //Prepare
    cy.get('#idUsername')
      .clear()
      .type('admin1')
    cy.get('#idName')
      .clear()
      .type('admin1')
    cy.get('#idEmail')
      .clear()
      .type('admin1@admin1.com')

    //Execute
    cy.get('#idSaveProfile')
      .click()

    cy.wait(2000)
    cy.visit('http://localhost:3000/app/notes')
    cy.contains('Filter:')
    cy.visit('http://localhost:3000/app/profile')

    //Test
    cy.get('#idUsername')
      .should('have.value', 'admin1')
    cy.get('#idName')
      .should('have.value', 'admin1')
    cy.get('#idEmail')
      .should('have.value', 'admin1@admin1.com')
  })



  it('Change password details', function(){
    //Prepare
    cy.get('#idOldPassword')
      .clear()
      .type('admin')
    cy.get('#idNewPassword1')
      .clear()
      .type('admin1')
    cy.get('#idNewPassword2')
      .clear()
      .type('admin1')

    //Execute
    cy.get('#idSavePassword')
      .click()
    cy.wait(1000)

    //Test
    cy.contains('Password updated')
    cy.get('#idOldPassword')
      .clear()
      .type('admin1')
    cy.get('#idNewPassword1')
      .clear()
      .type('admin')
    cy.get('#idNewPassword2')
      .clear()
      .type('admin')
    cy.get('#idSavePassword')
      .click()
    cy.wait(1000)
  })

  it('Change password details wrong with equal passwords', function(){
    //Prepare
    cy.get('#idOldPassword')
      .clear()
      .type('admin')
    cy.get('#idNewPassword1')
      .clear()
      .type('admin')
    cy.get('#idNewPassword2')
      .clear()
      .type('admin')

    //Execute
    cy.get('#idSavePassword')
      .click()
    cy.wait(1000)
    
    //Test
    cy.contains('Old and new passwords are the same')
  })

  it('Change password details wrong with old password', function(){
    //Prepare
    cy.get('#idOldPassword')
      .clear()
      .type('admin1')
    cy.get('#idNewPassword1')
      .clear()
      .type('admin')
    cy.get('#idNewPassword2')
      .clear()
      .type('admin')

    //Execute
    cy.get('#idSavePassword')
      .click()
    cy.wait(1000)
    
    //Test
    cy.contains('Old password incorrect')
  })

  it('Change password details wrong with new passwords do not match', function(){
    //Prepare
    cy.get('#idOldPassword')
      .clear()
      .type('admin')
    cy.get('#idNewPassword1')
      .clear()
      .type('abb')
    cy.get('#idNewPassword2')
      .clear()
      .type('abc')

    //Execute
    cy.get('#idSavePassword')
      .click()
    cy.wait(1000)
    
    //Test
    cy.contains('Passwords have to be the same')
  })



})