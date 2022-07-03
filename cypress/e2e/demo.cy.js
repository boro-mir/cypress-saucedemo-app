describe('example saucedemo app', () => {

    it('Check head title and meta tags ', () => {
        cy.get('head title').should('include.text', 'Swag Labs')
        cy.get('head meta[name="description"]')
            .should('have.attr', 'content')
            .should('contain', 'Sauce Labs Swag Labs app')
    })

    it('Checking for duplicates', () => {
        cy.url().should('include', '/inventory')
        cy.get('.inventory_item_name').should($li => {
            // const names = Cypress._.map($li, ($el) => {
            //     return $el.innerText
            // })
            const titles = Cypress._.map($li, 'innerText')
            console.log(titles)
            const distinct = Cypress._.uniq(titles)
            expect(distinct).to.have.length(titles.length)
            const counts = Cypress._.countBy(titles)
            console.log(counts)
            const duplicates = Cypress._.pickBy(counts, (n) => n > 1)
            console.log(duplicates)
            expect(duplicates).to.be.empty
        })
    })

    it('check css properties', () => {
        cy.url().should('include', '/inventory')
        cy.get('.inventory_item_name')
            .should('have.css', 'color', 'rgb(226, 35, 26)')
        cy.get('.inventory_item_name').each($li => {
            cy.wrap($li).should('have.css', 'color', 'rgb(226, 35, 26)')
                .and('have.css', 'font-size', '20px')
        })
    })

})