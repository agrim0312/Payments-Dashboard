/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress
      // inside the cy.origin() method from failing the test
      return false
    })
    cy.visit('http://localhost:3001')
  })

  it('signin works smoothly', () => {

    cy.get('#input-phone-for-credentials-provider').type("9999999999")
    // Fill in the password field
    cy.get('#input-password-for-credentials-provider').type('alice');
    cy.get('button').first().click();
    // Check it reaches Dashboard 
    cy.contains('Good afternoon, alice').should('exist');
  })
})
