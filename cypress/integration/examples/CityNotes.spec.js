/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://master.d1739p7ycye8ga.amplifyapp.com/')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('Type into Search and Submit', () => {
      // https://on.cypress.io/type
      cy.get('input')
        .type('fake@email.com').should('have.value', 'fake@email.com')
    })


    it('Should go to the city page when clicked', () => {
        cy.get('.App-header > :nth-child(3)').click()
        cy.get('h1').should('have.text','Chandler')
    })


})
