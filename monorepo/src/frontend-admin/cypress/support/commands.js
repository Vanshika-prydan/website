import AuthenticationService from '../../src/services/authentication-service';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('loginEmployee', async () => {
  localStorage.setItem('IS_AUTHENTICATED', 'TRUE');
  await AuthenticationService.login({ email: 'niklas@cleangreen.se', password: '3r4etgkfohke_RGGL45y!' });
});
Cypress.Commands.add('login', () => {
  localStorage.setItem('IS_AUTHENTICATED', 'TRUE');
  AuthenticationService.login({ email: 'niklas@cleangreen.se', password: '3r4etgkfohke_RGGL45y!' });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
