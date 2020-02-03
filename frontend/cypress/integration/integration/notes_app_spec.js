describe('Notes', function(){




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


  it('Open add note view', function(){

    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.get('#addNote')
      .click()
    cy.contains('Add new Note')

  })

  it('Close view', function(){

    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.get('#addNote')
      .click()
    cy.contains('Add new Note')
    cy.get('#cancel')
      .click()

    cy.contains('Filter:')

  })

  it('Add note', function(){

    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.get('#addNote')
      .click()
    cy.contains('Add new Note')
    cy.get('#title')
      .type('testtitle')
    cy.get('#body')
      .type('testbody')
    cy.get('#save')
      .click()
    cy.contains('testtitle')
  })

  it('Filter note', function(){

    //Add Note to filter
    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.get('#addNote')
      .click()
    cy.contains('Add new Note')
    cy.get('#title')
      .type('wwww')
    cy.get('#body')
      .type('wwww')
    cy.get('#save')
      .click()
    cy.contains('testtitle')

    //Filter
    cy.get('#idNoteFilter')
      .type('www')

    cy.contains('www')
    cy.contains('testtitle')
      .should('not.exist')
    

    //Delete
    cy.contains('wwww')
      .click()
    cy.get('#deleteNote')
      .click()
    cy.get('#save')
      .click()
    cy.contains('wwww')
      .should('not.exist')
  })


  it('Delete note', function(){

    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.contains('testtitle')
      .click()
    cy.contains('testbody')
    cy.get('#deleteNote')
      .click()
    cy.get('#save')
      .click()
    cy.contains('testtitle')
      .should('not.exist')
    
  })


})