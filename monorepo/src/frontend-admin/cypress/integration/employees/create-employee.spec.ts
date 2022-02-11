describe('Create employee - stub requests', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginEmployee();
    /* cy.intercept('GET', '/account/role', {
      statusCode: 200,
      body: [{ name: 'DEVELOPER', permissions: ['EMPLOYEE_CREATE', 'EMPLOYEE_UPDATE', 'EMPLOYEE_LIST_ALL', 'CUSTOMER_LIST_ALL', 'CUSTOMER_ADD_AND_BIND_ADDRESS'], description: null }]
    }); */
    cy.visit(`${Cypress.env('SITE_URL')}/employee`);
    cy.contains(/ADD EMPLOYEE/i).click();
  });
  it('Should be possible to visit the side and open the create employee modal', () => {
    cy.contains('Add new employee').should('be.visible');
    cy.get('[data-test=ADD_EMPLOYEE_SUBMIT]').should('be.disabled');
    cy.contains(/cancel/i).click();
    cy.contains('Add new employee').should('not.be.visible');
  });
  it('Should be possible to register the new employee - STUB REQUEST', () => {
    cy.intercept('POST', '/employee', {
      statusCode: 201,
      body: 'it worked!',
    });
    cy.get('[data-test=firstName]').type('Niklas');
    cy.get('[data-test=lastName]').type('Johansson');
    cy.get('[data-test=email]').type('niklas@cleangreen.se');
    cy.get('[data-test=password]').type('strongPassword_"#R12');
    cy.get('[data-test=phoneNumber]').type('0704570508');
    cy.get('[data-test=ADD_EMPLOYEE_SUBMIT]').should('be.enabled').click();
  });

  it('Should throw an error if the email already exists', () => {
    cy.intercept('POST', '/employee', {
      statusCode: 409,
      body: {
        error: 'Error',
        errorCode: 'EMAIL_ALREADY_EXISTS'
      },
    });
    cy.get('[data-test=firstName]').type('Niklas');
    cy.get('[data-test=lastName]').type('Johansson');
    cy.get('[data-test=email]').type('niklas@cleangreen.se');
    cy.get('[data-test=password]').type('strongPassword_"#R12');
    cy.get('[data-test=phoneNumber]').type('0704570508');
    cy.get('[data-test=ADD_EMPLOYEE_SUBMIT]').should('be.enabled').click();
  });
});
