const allItems = '.inventory_item_name'

describe('example saucedemo app', () => {

    it('Check head title and meta tags', () => {
        // confirm that the page title includes the string "Sauce Labs"
        cy.get('head title').should('include.text', 'Swag Labs')

        // confirm that the page contains the meta tag "description"
        // with the value "Sauce Labs Swag Labs app"
        cy.get('head meta[name="description"]')
            .should('have.attr', 'content')
            .should('contain', 'Sauce Labs Swag Labs app')
    })

    it('Check for duplicate items', () => {
        cy.get(allItems).should($li => {
            // get the text of each item
            // and store it in an array
            const titles = Cypress._.map($li, 'innerText')
            console.log('titles: ', titles)

            // get the unique items
            const distinct = Cypress._.uniq(titles)
            // the check below reports if the array of unique elements has the same length as the original
            expect(distinct).to.have.length(titles.length)

            // then count the number of times each item appears
            const counts = Cypress._.countBy(titles)
            console.log(counts)

            // then check that each item appears only once
            // report duplicates if any
            const duplicates = Cypress._.pickBy(counts, (n) => n > 1)
            console.log(duplicates)
            expect(duplicates).to.be.empty
        })
    })

    it('Check css properties', () => {
        cy.get(allItems).each($li => {
            cy.wrap($li).should('have.css', 'color', 'rgb(24, 88, 58)')
                .and('have.css', 'font-size', '20px')
                .and('have.css', 'font-family', '"DM Mono", sans-serif')
                .and('have.css', 'text-decoration', 'none solid rgb(24, 88, 58)')
        })
    })

})