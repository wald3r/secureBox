describe('Logout ', function () {


  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.resetDb()
    cy.addAdmin()
    cy.loginAdmin()
  })

  it('logout of app', function(){
    cy.logout()
  })

})