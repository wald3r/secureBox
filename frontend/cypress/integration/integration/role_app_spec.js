describe('Roles', function(){


  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.resetDb()
  })

  it('Admin view as admin', function(){
    cy.addAdmin()
    cy.visit('http://localhost:3000')
    cy.loginAdmin()
    cy.visit('http://localhost:3000/admin')
    cy.contains('MIME-Types')
    cy.logout()
  })

  it('Admin view as user', function(){
    cy.addUser()
    cy.visit('http://localhost:3000')
    cy.loginUser()
    cy.visit('http://localhost:3000/admin')
    cy.contains('MIME-Types')
      .should('not.exist')
    cy.logout()

  })
})