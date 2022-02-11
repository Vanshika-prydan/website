describe('Create employee', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginEmployee();
    cy.visit(`${Cypress.env('SITE_URL')}/employee`);
    cy.contains(/ADD EMPLOYEE/i).click();
  });
  it('Should be possible to register the new employee - against database', () => {
    cy.intercept('POST', '/employee');
    cy.get('[data-test=firstName]').type('Niklas');
    cy.get('[data-test=lastName]').type('Johansson');
    cy.get('[data-test=email]').type('niklas@cleangreen.se');
    cy.get('[data-test=password]').type('strongPassword_"#R12');
    cy.get('[data-test=phoneNumber]').type('0704570508');
    cy.get('[data-test=ADD_EMPLOYEE_SUBMIT]').should('be.enabled').click();
  });

  it('Should throw an error if the email already exists', () => {
    cy.intercept('POST', '/employee');
    cy.get('[data-test=firstName]').type('Niklas');
    cy.get('[data-test=lastName]').type('Johansson');
    cy.get('[data-test=email]').type('niklas@cleangreen.se');
    cy.get('[data-test=password]').type('strongPassword_"#R12');
    cy.get('[data-test=phoneNumber]').type('0704570508');
    cy.get('[data-test=ADD_EMPLOYEE_SUBMIT]').should('be.enabled').click();
  });
});
