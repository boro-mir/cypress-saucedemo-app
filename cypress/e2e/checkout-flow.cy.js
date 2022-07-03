it('should ', function () {
    cy.url().should('include', '/inventory')
    cy.get('[data-test^="add-to-cart"]')
        .should('have.length.greaterThan', 0)
        .its('length')
        .then(cy.log)
        .then(n => Cypress._.random(0, n - 1))
        .then(cy.log)
        .then(item =>
            cy.get('[data-test^="add-to-cart"]')
                .eq(item)
                .click()
                .should('not.exist'))
    cy.get('[id^=remove]')
        .should('be.visible')
        .and('have.length', 1)
    cy.get('.shopping_cart_badge')
        .invoke('text')
        .should('eq', '1')
    cy.get('.shopping_cart_badge').click()
    cy.get('.inventory_item_price')
        .invoke('text').as('price')
        .then(cy.log)
        .then(() => {
            cy.get('#checkout').click()
            cy.get('#first-name').type('Cypress')
            cy.get('#last-name').type('User')
            cy.get('#postal-code').type('12345')
            cy.get('#continue').click()
            cy.get('.inventory_item_price').should('have.text', this.price)
        })

    cy.get('#finish').click()
    cy.get('.complete-header')
        .should('have.text', 'THANK YOU FOR YOUR ORDER')

})