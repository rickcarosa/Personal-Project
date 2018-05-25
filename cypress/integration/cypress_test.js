it('personal', () => {
    cy.visit('https://showmanias.com/#/dashboard')

    cy.get('a[href="#/shows"]')
        .contains('Shows')
        .click()
})

it('personal', () => {
    cy.visit('https://showmanias.com/#/shows')

    cy.get('.search')
        .type('house')
        .should('have.value', 'house')
    cy.get('.find_shows')
        .click()
})


