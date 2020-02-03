describe('Admin', function(){


  beforeEach(function(){

    cy.visit('http://localhost:3000')
    cy.resetDb()
    cy.addAdmin()
    cy.addUser()
    cy.loginAdmin()

  })

  
  it('List all users', function(){
    cy.visit('http://localhost:3000/admin')

    cy.contains('user')
    cy.contains('user@user.com')
    cy.contains('true')
  })

  it('Delete user', function(){
    //Execute
    cy.visit('http://localhost:3000/admin')
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
    cy.visit('http://localhost:3000/admin')
    cy.get('#idChangeUser')
      .click()

    cy.get('table')
      .contain('td', '#idUsername')
      .type('user1')
    
    cy.get('#idName')
      .clear()
      .type('user1')
    
    cy.get('#idEmail')
      .clear()
      .type('user1@user1.com')
    
    cy.get('#idAdmin')
      .click()

    cy.get('#idActive')
      .click()

    cy.get('#idSave')
      .click()

    //Test
    cy.contains('user')
      .should('not.exist')
    cy.contains('user1')
  })

})