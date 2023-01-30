import Chance from 'chance';
const chance = new Chance();

describe('Doneren', () => {
  var username = "";
  var email = "";
  const password = 'String1!';

  it('gaat naar ikdoneer website', () => {
    username = chance.word();
    email = chance.email();
    cy.RegisterAndLogin(username, email, password);

    cy.get('a[href="/Over-ons"]').click();
    cy.get('button').contains('Vraag eerst toestemming').click();
    cy.origin('https://ikdoneer.azurewebsites.net', () => {
      cy.get('a[href="/"').contains('IkDoneer')
    }) 
  })

  it('gaat naar ikdoneer website en keert terug met token, en na doneren kan bij doneerportaal', () => {
    username = chance.word();
    email = chance.email();
    cy.RegisterAndLogin(username, email, password);
    var jwt_token = cy.getCookie("jwt")
    cy.get('a[href="/Over-ons"]').click();
    cy.get('button').contains('Vraag eerst toestemming').click();
    // const formData = new FormData()
    // formData.append("token", "randomtoken123")
    // cy.request({
    //   method: 'POST',
    //   url: 'http://api.localhost/api/Donatie/AddToken/' + jwt_token.value,
    //   body: formData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    cy.origin('https://ikdoneer.azurewebsites.net', { args: { email, password } }, ({ email, password }) => {
      cy.get('a').contains('Registreer als een nieuwe gebruiker').click()
      cy.get('#Input_Email').type(email);
      cy.get('#Input_Password').type(password);
      cy.get('#Input_ConfirmPassword').type(password);
      cy.get('button').contains('Registreer').click();
      cy.get('button').contains('Ik weet het zeker').click();
    })
    // cy.get('button').contains('Doneer').click();
    // cy.origin('https://ikdoneer.azurewebsites.net', { args: { email, username} }, ({ email, username }) => {
    //   cy.get('a').contains('Goede doelen').click();
    //   // for (let n = 0; n < 100; n++) {
    //   //   cy.get('a[href="/Donatie/Stort"]')
    //   //     .click()
    //   // }

    // })
    cy.request({
      method: 'POST',
      url: 'http://api.localhost/api/Donatie/DonatieListener',
      body: {
        "email": email,
        "hoeveelheid": 1000,
        "naam": username
      }
    })
    cy.visit('http://frontend.localhost');
    cy.get('a').contains('Login').click();
    cy.get('#gebruikersnaam').type(username)
    cy.get('#password').type(password)
    cy.get('button').contains("Log in").click();
    cy.get('a').contains('Donateurs Panel').should('be.visible');
  })
}) 