describe('Service page', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login();
    cy.visit(`${Cypress.env('SITE_URL')}/service`);
  });
  it('should visit the page and create a new role', () => {
    cy.contains(/add service/i).click();
    cy.get('[data-test="name"]').type('New service');
    cy.get('[data-test="description"]').type('This is a new service');
    cy.intercept('post', `${Cypress.env('API_URL')}/booking/booking-type`, {
      statusCode: 201,
      body: {
        bookingTypeId: 'f3197c82-5054-4ec0-a5fb-4ec4894cc42c',
        name: 'New service',
        description: 'This is a new service',
      },
    });
    cy.get('[data-test="ADD_SERVICE_SUBMIT"]').click();
    cy.contains(/add service/i)
      .should('exist')
      .click();
    cy.get('[data-test="name"]').should('have.value', '');
  });
  it('should warn if an error occurs', () => {
    cy.contains(/add service/i).click();
    cy.get('[data-test="name"]').type('New service');
    cy.get('[data-test="description"]').type('This is a new service');
    cy.intercept('post', `${Cypress.env('API_URL')}/booking/booking-type`, {
      statusCode: 500,
      body: { error: 'Error', errorCode: 'DATABASE_ERROR' },
    });
    cy.get('[data-test="ERROR_MESSAGE"]').should('not.exist');

    cy.get('[data-test="ADD_SERVICE_SUBMIT"]').click();
    cy.get('[data-test="ERROR_MESSAGE"]').should('exist');
  });
});
