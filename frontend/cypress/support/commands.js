// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add("resetDb", function(){
  cy.request('GET', 'http://localhost:3003/api/cypress/clear')
})

Cypress.Commands.add("addAdmin", function(){
  cy.request('GET', 'http://localhost:3003/api/cypress/add')
})

Cypress.Commands.add('logout', function() {
  cy.visit('http://localhost:3000')
  cy.get('.logout')
    .click()
  cy.contains('Login')

})


Cypress.Commands.add('login', function(){
  cy.visit('http://localhost:3000')
  cy.get('#username')
      .type('admin')
  cy.get('#password')
      .type('admin')
  cy.get('#login')
      .click()
  cy.contains('admin is logged in')

})