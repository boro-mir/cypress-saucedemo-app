const addToCartCTAs = '[data-test^="add-to-cart"]'
const cartCTA = '.shopping_cart_badge'
const itemPrice = '.inventory_item_price'

it('should ', function () {
    cy.get(cartCTA).should('not.exist')
    cy.get('.title').should('have.text', 'Products')
    // get all the products
    // and wait for them to load
    cy.get(addToCartCTAs)
        .should('have.length.greaterThan', 0)
        .its('length')
        // log the number of products
        .then(cy.log)
        // using Cypress lodash random function
        // to get a random product
        .then(n => Cypress._.random(0, n - 1))
        // print the random product index
        .then(cy.log)
        // click on the random product
        .then(item =>
            cy.get(addToCartCTAs)
                .eq(item)
                .click()
                // wait for the add-to-cart CTA for this product to disappear
                .should('not.exist'))
    cy.get('[id^=remove]')
        .should('be.visible')
        .and('have.length', 1)
    // verify that the shopping cart has the correct number of items
    cy.get(cartCTA)
        .invoke('text')
        .should('eq', '1')
    cy.get(cartCTA).click()
    cy.url().should('include', '/cart')
    cy.get('#checkout').should('be.visible')
    cy.get('#continue-shopping').should('be.visible')
    cy.get('.title').should('have.text', 'Your Cart')
    cy.get(itemPrice)
        // store the price of the item in the cart in a variable
        .invoke('text').as('price')
        .then(cy.log)
        .then(() => {
            cy.get('#checkout').click()
            cy.url().should('include', '/checkout-step-one')
            cy.get('#cancel').should('be.visible')
            cy.get('.title').should('have.text', 'Checkout: Your Information')
            cy.get('#first-name').should('be.visible').type('Nick')
            cy.get('#last-name').type('Fury')
            cy.get('#postal-code').type('H0H 0H0')
            cy.get('#continue').click()
            cy.url().should('include', '/checkout-step-two')
            // verify that the total price is correct
            // price of the item on the checkout page vs the price of the item on the shopping cart page
            cy.get(itemPrice).should('have.text', this.price)
            cy.get('.summary_value_label')
                .first()
                .should('include.text', 'SauceCard')
            cy.get('.summary_value_label')
                .eq(1)
                .should('have.text', 'FREE PONY EXPRESS DELIVERY!')
        })

    cy.get('#finish').click()
    cy.url().should('include', '/checkout-complete')
    cy.get('.pony_express')
        .should('have.attr', 'src', '/static/media/pony-express.46394a5d.png')
    cy.get('#back-to-products').should('be.visible')
    cy.get('.complete-header')
        .should('have.text', 'THANK YOU FOR YOUR ORDER')
})