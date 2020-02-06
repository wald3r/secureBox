describe('Admin', function(){


  beforeEach(function(){

    cy.visit('http://localhost:3000')
    cy.resetDb()
    cy.addAdmin()
    cy.addUser()
    cy.loginAdmin()
    cy.visit('http://localhost:3000/app/admin')


  })

  
  it('List all users', function(){
    cy.contains('user')
    cy.contains('user@user.com')
    cy.contains('true')
  })

  it('Delete user', function(){
    //Execute
    cy.get('#idDelete')
      .click()

    cy.get('#save')
      .click()

    //Test
    cy.contains('user')
      .should('not.exist')
  })

  it('Change user', function(){
    //Execute
    cy.get('#idChangeUser')
      .click()

    
    cy.get('#idChangeUsername')
      .clear()
      .type('user1')

    cy.get('#idChangeName')
      .clear()
      .type('user1')
    
    cy.get('#idChangeEmail')
      .clear()
      .type('user1@user1.com')
    
    cy.get('#idAdmin')
      .click()

    cy.get('#idActive')
      .click()

    cy.get('#idSave')
      .click()

    //Test
    cy.contains('user1')
    cy.contains('user1@user1.com')
    cy.contains('admin')
    cy.contains('false')
  })


  it('Open Mimes', function(){
    cy.contains('MIME-Types')
      .click()

    cy.contains('Name')
    cy.contains('Ending')
  })

  it('Open AddMimes', function(){
    cy.contains('MIME-Types')
      .click()

    cy.get('#idAddMime')
      .click()
    cy.contains('Add new MIME-Type')
  })

  it('Close AddMimes', function(){
    cy.contains('MIME-Types')
      .click()

    cy.get('#idAddMime')
      .click()
    
    cy.get('#idClose')
      .click()

    cy.contains('Add MIME-Type')
      .should('not.exist')
  })

  it('Add Mimes', function(){
    cy.contains('MIME-Types')
      .click()

    cy.get('#idAddMime')
      .click()
    
    cy.get('#idAddName')
      .type('testname')

    cy.get('#idAddEnding')
      .type('.testending')

    cy.get('#idSave')
      .click()

    cy.contains('testname')
    cy.contains('.testending')
  })

  it('Delete Mimes', function(){
    cy.contains('MIME-Types')
      .click()

    cy.get('#idAddMime')
      .click()
    
    cy.get('#idAddName')
      .type('testname')

    cy.get('#idAddEnding')
      .type('.testending')

    cy.get('#idSave')
      .click()

    cy.get('#idDeleteMime')
      .click()

    cy.get('#save')
      .click()
    
    cy.contains('.testending')
      .should('not.exist')

    cy.contains('testname')
      .should('not.exist')


  })

  it('Not delete mimes', function(){
    cy.contains('MIME-Types')
      .click()

    cy.get('#idAddMime')
      .click()
    
    cy.get('#idAddName')
      .type('testname')

    cy.get('#idAddEnding')
      .type('.testending')

    cy.get('#idSave')
      .click()

    cy.get('#idDeleteMime')
      .click()

    cy.get('#cancel')
      .click()
    
    cy.contains('.testending')
    cy.contains('testname')
  


  })


})