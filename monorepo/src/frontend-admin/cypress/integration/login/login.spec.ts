/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('SITE_URL')}/login`);
  });
  it('should login sucessfully', () => {
    cy.get('#email').type('niklas@cleangreen.se');
    cy.get('#password').type('3r4etgkfohke_RGGL45y!');
    cy.intercept('iam/login').as('REQ');
    cy.contains('Sign In').click();
    cy.wait('@REQ');
    cy.getCookie('accessToken').should('exist');
    cy.getCookie('refreshToken').should('exist');
  });
  it('should warn the user if the account does not exists', () => {
    cy.get('#email').type('doesnotexist@cleangreen.se');
    cy.get('#password').type('3r4etgkfohke_RGGL45y!');
    cy.contains('Sign In').click();
    cy.contains('The account does not exist');
  });
});
