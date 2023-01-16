describe('registreer', () => {
  it('passes', () => {
    cy.visit('http://frontend.localhost/Registration')
    cy.get('#userName').type('fake@email.com')
    cy.get('#email').type('urmom@kfc.com')
    cy.get('#password').type('!String1')
    cy.get('#userName').should('have.value', 'fake@email.com')
    cy.get('button').click()
  })
})

// describe('login', () => {
//   it('passes', () => {
//     cy.visit('http://frontend.localhost/Login')
//     cy.get('#gebruikersnaam').click()
//     cy.get('#gebruikersnaam').type('fake@email.com')
//     cy.get('#password').type('!String1')
//     // cy.get('#gebruikersnaam').should('have.value', 'fake@email.com')
//     // cy.get('button').click()
//   })
// })