describe('Logout ', function () {


  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.get('#username')
      .type('admin')
    cy.get('#password')
      .type('admin')
    cy.get('#login')
      .click()
    
    cy.contains('admin is logged in')
  })

  it('logout of app', function(){
    cy.get('.logout')
      .click()
   
    cy.contains('Registration')
  })

})