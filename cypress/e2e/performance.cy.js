const loginCTA = '#login-button'

it('measure performance using Performance Web API', () => {
    // log out of the application with existing credentials
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.get(loginCTA).should('be.visible')

    // log in with new credentials
    cy.get('#user-name').type(Cypress.env('glitchUsername'))
    cy.get('#password').type(Cypress.env('password'))

    // using cy.window() to access the window object and the Performance API
    // to measure the time it takes to log in
    // create a marker for the start of the login process
    cy.window()
        .its('performance')
        .invoke('mark', 'loginButtonIsClicked')
    cy.get(loginCTA).click()
    cy.get(loginCTA).should('not.exist')
    cy.get('.shopping_cart_link').should('be.visible')

    // create a marker for the end of the login process
    // and verify that the time it takes to log in is less than 5 seconds
    // this is a good indicator that the login process is fast enough
    // call performance.measure() function to make our measurement
    cy.window()
        .its('performance')
        .invoke('measure', 'loginButtonClick')
        .its('duration', {timeout: 0})
        .should('be.lessThan', 5000)
})