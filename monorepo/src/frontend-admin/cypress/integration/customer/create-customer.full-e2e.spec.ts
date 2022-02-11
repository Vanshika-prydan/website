describe('Create customer with mock data', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginEmployee();
    cy.visit(`${Cypress.env('SITE_URL')}/customer`);
    cy.contains(/add customer/i).click();
  });
  it('should visit the site and register a customer without the address', () => {
    cy.get('[data-test=firstName]').type('Niklas');
    cy.get('[data-test=lastName]').type('Johansson');
    cy.get('[data-test=email]').type('niklas@ttt.se');
    cy.get('[data-test=phoneNumber]').type('0704443344');
    cy.get('[data-test=ADD_CUSTOMER_SUBMIT]').click();
  });

  it('should show an error if the create request fails', () => {
    cy.get('[data-test=firstName]').type('Niklas');
    cy.get('[data-test=lastName]').type('Johansson');
    cy.get('[data-test=email]').type('niklas@ttt.se');
    cy.get('[data-test=phoneNumber]').type('0704443344');
    cy.get('[data-test=ADD_CUSTOMER_SUBMIT]').click();
    cy.get('[data-test="ERROR_MESSAGE"]').should('exist');
  });
});
