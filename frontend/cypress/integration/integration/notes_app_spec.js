describe('Notes', function(){




  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.resetDb()
    cy.addAdmin()
    cy.loginAdmin()
  })



  it('Open add note view', function(){

    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.get('#addNote')
      .click()
    cy.contains('Add new Note')

  })

  it('Close view', function(){

    //Execute
    cy.visit('http://localhost:3000/notes')
    cy.contains('Filter:')
    cy.get('#addNote')
      .click()
    cy.contains('Add new Note')
    cy.get('#cancel')
      .click()

    //Test
    cy.contains('Filter:')

  })

  it('Add note', function(){

    //Execute
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
    
    //Test
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
    cy.contains('wwww')

    //Filter
    cy.get('#idNoteFilter')
      .type('www')

    cy.contains('www')
    cy.contains('testtitle')
      .should('not.exist')
    
  })


  it('Delete note', function(){

    //Prepare
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

    //Execute
    cy.contains('testtitle')
      .click()
    cy.contains('testbody')
    cy.get('#deleteNote')
      .click()
    cy.get('#save')
      .click()

    //Test
    cy.contains('testtitle')
      .should('not.exist')
    
  })


})