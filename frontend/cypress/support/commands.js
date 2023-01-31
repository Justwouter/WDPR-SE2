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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add('RegisterAndLogin', (userName, email, password) => {
    // Registreer gedeelte
    cy.visit('http://frontend.localhost/Registration');
    cy.clearCookies();
    cy.get('#userName').type(userName);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').click();

    // Login gedeelte
    cy.get('#gebruikersnaam').type(userName)
    cy.get('#password').type(password)
    cy.get('button').click();
})