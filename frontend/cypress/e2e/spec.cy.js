
describe('Programma toevoegen', () => {
  it('Programma toegevoegd', () => {
    cy.visit('http://frontend.localhost/ProgrammaToevoegen')
    
    cy.get('input[name="titel"]').type('TestZaal2').should('have.value', 'TestZaal2');
    cy.get('select').first().select('Zang').should('have.value', 'Zang');
    cy.get('input[name="van"]').type("2023-01-22T06:10").should('have.value', '2023-01-22T06:10');
    cy.get('input[name="tot"]').type("2023-01-22T07:10").should('have.value', '2023-01-22T07:10');
    cy.get('textarea[name="descriptie"]').type('lorem ipsum').should('have.value', 'lorem ipsum');
    cy.get('select').eq(1).select('Zaal 2').should('have.value', '2');
    
    cy.get('button').click()
  })

})

describe('Kaart bestellen is mislukt', () => {
  it('Heeft kaartjes besteld', () => {
    cy.visit('http://frontend.localhost/programmalijst')
    cy.intercept({
      method: 'GET',
      url: '/api/programma',
      }, (req) => {
      assert.deepEqual(req.body, 11013);
      })
      cy.get('.bestelKnop').first().click()

      //Stoel kiezen
      cy.get('.vrij').first().click()
      cy.get('h1').should(($p) => {
        expect($p.first()).to.contain('1')
      })
      //Reserveren
      cy.get('button').click()

      //Gegevens invullen
      cy.get('input[name="naam"]').type("Piet").should('have.value', 'Piet');
      cy.get('input[name="email"]').type("Piet@gmail.com").should('have.value', 'Piet@gmail.com');

      //Betalen
      cy.get('button').click()
      cy.get('input[name="account"]').type('NL55ABNA5660751953').should('have.value', 'NL55ABNA5660751953');
      cy.get('button').click()
      cy.on('uncaught:exception', (err, runnable) => {return false;});

      //Betaling is mislukt
      cy.get('h1').eq(1).should('have.text',"Betaling is mislukt");

  })
 })

 describe('Kaart bestellen is succesvol', () => {
  it('Heeft kaartjes besteld', () => {
    cy.visit('http://frontend.localhost/programmalijst')
    cy.intercept({
      method: 'GET',
      url: '/api/programma',
      }, (req) => {
      assert.deepEqual(req.body, 11013);
      })
      cy.get('.bestelKnop').first().click()

      //Stoel kiezen
      cy.get('.vrij').first().click()
      cy.get('h1').should(($p) => {
        expect($p.first()).to.contain('1')
      })
      //Reserveren
      cy.get('button').click()

      //Gegevens invullen
      cy.get('input[name="naam"]').type("Piet").should('have.value', 'Piet');
      cy.get('input[name="email"]').type("Piet@gmail.com").should('have.value', 'Piet@gmail.com');

      //Betalen
      cy.get('button').click()
      cy.get('input[name="account"]').type('NL55ABNA5660751954').should('have.value', 'NL55ABNA5660751954');
      cy.get('button').click()
      cy.on('uncaught:exception', (err, runnable) => {return false; });

      //Betaling is succesvol
      cy.get('h1').eq(1).should('have.text',"Betaling is succesvol");

  })
 })
  
