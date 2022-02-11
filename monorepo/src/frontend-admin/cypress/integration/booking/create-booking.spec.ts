describe('Create new booking', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login();
    cy.visit(`${Cypress.env('SITE_URL')}/booking`);
  });
  it('should visit the page and open the create booking dialog and cancel the process', () => {
    cy.contains(/new booking/i).click();
    cy.contains(/Create new booking/i).should('exist');
    cy.contains(/cancel/i).click();
    cy.contains(/Create new booking/i).should('not.exist');
  });
});
