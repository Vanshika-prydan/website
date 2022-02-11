describe('List all customers', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginEmployee();
    cy.intercept('GET', `${Cypress.env('API_URL')}/customer`, {
      statusCode: 200,
      body: [{
        customerId: 'f7e630d2-9879-4d2c-b8b4-fbb743baab98',
        account: {
          accountId: '0ae7190d-b652-4259-b444-a7b52e32f4c7',
          firstName: 'Niklas',
          lastName: 'Johansson',
          email: 'nn@rfei.se',
          dateCreated: '2021-03-25T08:10:44.645Z',
          dateUpdated: '2021-03-25T08:10:44.645Z'
        },
        addresses: [{
          isPrimaryAddress: true,
          address: {
            addressId: 'c9ea934f-13f4-41be-9023-0f66f0feea12',
            street: 'Hornsgatan 43',
            postalCode: '11111',
            country: 'SE',
            postalCity: 'Stockholm',
            information: 'More info',
            code: '3322'
          }
        }],
      }]
    }).as('FETCH_CUSTOMER');
    cy.visit(`${Cypress.env('SITE_URL')}/customer`);
  });

  it('should load all customers', () => {
    cy.get('[data-test="CUSTOMER_LIST_IS_LOADING" ]').should('exist');
    cy.wait('@FETCH_CUSTOMER');
    cy.get('[data-test="CUSTOMER_LIST_IS_LOADING" ]').should('not.exist');
    cy.contains(/Niklas Johansson/i).should('exist');
  });
});
