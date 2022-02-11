
function fillValidCustomerInput () {
  cy.get('[data-test=firstName]').type('Niklas');
  cy.get('[data-test=lastName]').type('Johansson');
  cy.get('[data-test=email]').type('niklas@test.se');
  cy.get('[data-test=phoneNumber]').type('0704443322');
}

function controlResetedCustomerInput () {
  cy.get('[data-test=firstName]').should('have.value', '');
  cy.get('[data-test=lastName]').should('have.value', '');
  cy.get('[data-test=email]').should('have.value', '');
  cy.get('[data-test=phoneNumber]').should('have.value', '');
}

function fillValidAddressInput () {
  cy.get('[data-test="street"]').type('Hornsgatan 45');
  cy.get('[data-test="postalCode"]').type('11154');
  cy.get('[data-test="postalCity"]').type('Stockholm');
  cy.get('[data-test="code"]').type('4553');
  cy.get('[data-test="information"]').type('Second floor, knock hard on the door');
}

function visitAndSuccessfullyRegisterACustomer () {
  fillValidCustomerInput();
  cy.intercept('POST', `${Cypress.env('API_URL')}/customer`, {
    statusCode: 200,
    body: { customerId: 'a61de91a-cfe5-4f82-8e9b-d838efa9b9bb', account: { accountId: 'db61dc15-3ba0-4762-928c-ce4936aafcd5', firstName: 'Niklas', lastName: 'Johansson', email: 'niklas@test.com', phoneNumber: '0704443320', dateCreated: '2021-03-24T15:10:32.613Z', dateUpdated: '2021-03-24T15:10:32.613Z' } }
  }).as('CREATE_CUSTOMER');
  cy.get('[data-test=ADD_CUSTOMER_SUBMIT]').click();
  cy.wait('@CREATE_CUSTOMER');
}

describe('Create customer with mock data', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginEmployee();
    cy.visit(`${Cypress.env('SITE_URL')}/customer`);
    cy.contains(/add customer/i).click();
  });
  it('All fields should be cleared upon closing', () => {
    fillValidCustomerInput();
    cy.contains(/cancel/i).click();
    cy.contains(/add customer/i).click();
    controlResetedCustomerInput();
  });
  it('should visit the site and register a customer without the address', () => {
    visitAndSuccessfullyRegisterACustomer();
    cy.get('[data-test="CREATE_CUSTOMER_FORM"]').should('not.exist');
    cy.contains(/Im finish/i).click();
  });
  it('should visit the site and register a customer with the address', () => {
    visitAndSuccessfullyRegisterACustomer();
    cy.contains(/Add an address/i).click();
    cy.contains(/Add an address/i).should('not.exist');
    cy.get('[data-test="ADD_ADDRESS_FORM"]').should('exist');
    cy.get('[data-test="ADD_ADDRESS_SUBMIT"]').should('be.disabled');

    // Start the add address
    fillValidAddressInput();
    /* cy.intercept("POST",`${Cypress.env("API_URL")}/customer/add-address`,{
      statusCode:201,
      body: {"customerId":"f7e630d2-9879-4d2c-b8b4-fbb743baab98","account":{"accountId":"0ae7190d-b652-4259-b444-a7b52e32f4c7","firstName":"Niklas","lastName":"Johansson","email":"nn@rfe.se","dateCreated":"2021-03-25T08:10:44.645Z","dateUpdated":"2021-03-25T08:10:44.645Z"},"addresses":[{"isPrimaryAddress":true,"address":{"addressId":"c9ea934f-13f4-41be-9023-0f66f0feea12","street":"Rwgegoq","postalCode":"11111","country":"SE","postalCity":"Stochk","information":"Hej","code":"3322"}},{"isPrimaryAddress":true,"address":{"addressId":"c955672e-c191-4569-9716-aab79229f2cd","street":"Rwgegoq","postalCode":"11111","country":"SE","postalCity":"Stochk","information":"Hej","code":"3322"}},{"isPrimaryAddress":true,"address":{"addressId":"94d16405-1d6c-4f66-9b5d-3cb7e07a8b1e","street":"Rwgegoq","postalCode":"11111","country":"SE","postalCity":"Stochk","information":"Hej","code":"3322"}},{"isPrimaryAddress":true,"address":{"addressId":"851e846a-20ca-4ee4-9e59-9541a3d07950","street":"Rwgegoq","postalCode":"11111","country":"SE","postalCity":"Stochk","information":"Hej","code":"3322"}}]}
    }) */
    cy.get('[data-test="ADD_ADDRESS_SUBMIT"]').click();
    cy.get('[data-test="ADD_ADDRESS_ERROR_MESSAGE"]').should('not.exist');
    // cy.contains(/Add address/i).click();
  });

  // DISABLED DUE TO BUG IN CPRESS
  /* it('should visit the site and register a customer with the address, but the address should fail', () => {
    visitAndSuccessfullyRegisterACustomer();
    cy.contains(/Add an address/i).click();
    fillValidAddressInput();
    cy.intercept('POST', ` ${Cypress.env('API_URL')}/customer/add-address/*`, {
      statusCode: 401,
      body: { error: 'Error', errorCode: 'ACCESS_DENIED' }
    }).as('ADDRESS');
    cy.get('[data-test="ADD_ADDRESS_SUBMIT"]').click();
    cy.wait('@ADDRESS');
    cy.get('[data-test="ADD_ADDRESS_ERROR_MESSAGE"]').should('exist');
  }); */

  it('should show an error if the create request fails', () => {
    fillValidCustomerInput();
    cy.intercept('POST', `${Cypress.env('API_URL')}/customer`, {
      statusCode: 409, body: { error: 'Error', errorCode: 'EMAIL_ALREADY_EXISTS' }
    }).as('CREATE_CUSTOMER');
    cy.get('[data-test=ADD_CUSTOMER_SUBMIT]').click();
    cy.get('[data-test="ERROR_MESSAGE"]').should('exist');
  });
});
