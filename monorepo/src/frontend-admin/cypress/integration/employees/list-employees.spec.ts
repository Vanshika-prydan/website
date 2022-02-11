describe('List all employees', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginEmployee();
    cy.intercept('/employee').as('REQ');
    cy.visit(`${Cypress.env('SITE_URL')}/employee`);
  });
  it('Should load all employees', () => {
    cy.get('[data-test=LOADING_SPINNER]').should('exist');
    cy.contains(/Niklas Johansson/i).should('exist');
    cy.get('[data-test=LOADING_ERROR]').should('not.exist');
  });
  it('Should display an error if the employees cannot be loaded', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/employee`, { statusCode: 401, body: { error: 'Error', errorCode: 'ACCESS_DENIED' } });
    cy.visit(`${Cypress.env('SITE_URL')}/employees`);
    cy.get('[data-test=LOADING_ERROR]').should('exist');
  });
});
