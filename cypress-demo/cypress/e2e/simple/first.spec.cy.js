/// <reference types="cypress" />

/**
 * SUMMARY:
 * This example is based on the "Writing Your First E2E Test" guide in the cypress.io docs.
 * 
 * This is a very simple test which navigates to David Nuzik's GitHub profile, searches (cy.contains) or gets specific
 * text/elements, takes actions, and makes assertions. It shows some of the basic principles of visiting a page and
 * then navigating it like a user may and making assertions. Take note that it is generally bad practice to test
 * against a production app and even more so for a server/system you do not own and control. An exception is made in
 * this case since this project is a simple demonstration and results in extremely low load on GitHub servers.
 * 
 * REMARKS:
 * Searching for strings and clicking in this manner ("/k3s") is not always an ideal setup. Depending on the app,
 * there could be more than one result returned when searching for a specific string. As such, depending
 * on how the page is designed and then rendered, unexpected circumstances could result in finding one of
 * two or more results and clicking on the wrong one. If both/all the potential results are hyperlinked and
 * navigate to the same location the test may still pass but may not be making the intended steps.
 * 
 * Therefore, when using selectors it is generally a good idea to provide more than one attribute or to be highly
 * specific when selecting for a specific id or other content in the DOM. After the cy.contains you'll notice
 * that I switch to getting elements by a specific id. This is more reliable and generally a better practice when
 * it is an option. If it's necessary to use cy.contains to search for text you can use .first() or .last() or other
 * means to differentiate between elements should more than one contain the specified string.
 */

describe('/davidnuzik example GETs', () => {
  it('Navigates to /davidnuzik and performs basic checks with simple locators and assertions', () => {
    // Visit /davidnuzik, ensure page loads, check for "/k3s" string, click on the result
    cy.visit('https://github.com/davidnuzik')
    cy.contains('/k3s').click() //cy.get with specific search for id and/or attributes is a better practice (see remarks)

    // Verify the URL should now include "/k3s"
    cy.url().should('include', '/k3s')

    // Get the "Issues" tab, click on it
    cy.get('[id="issues-tab"]').click()

    // Verify the URL should now include "/issues"
    cy.url().should('include', '/issues')

    // Get the issues search field, type into it
    cy.get('[id="js-issues-search"]').type('author:davidnuzik')
    // Verify the the expected value was appended to the pre-filled string
    cy.get('#js-issues-search').should('have.value', 'is:issue is:open author:davidnuzik') // # is a shortcut for an id
  })
})