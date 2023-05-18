/// <reference types="cypress" />

/**
 * SUMMARY:
 * This example checks the various top nav bar tabs on the k3s-io/k3s project in GitHub.
 * 
 * This simple set of tests first navigates to the k3s-io/k3s project on GitHub, validates the page loads, and then
 * proceeds to locate and perform various clicks and assertions against the top nav bar tabs (Issues, Pull requests,
 *  etc). These tests go in a little more depth than the "first" spec. For example, upon navigation and successful
 * page load, more assertions are made to validate the page has loaded and rendered in an expected way. Note that
 * these tests do not validate data against the GitHub API. Checks against an API are found in the advanced folder.
 * Note that of the time of writing, the advanced folder and tests are not available yet, May 2023.
 * 
 * REMARKS:
 * There are ways in which this spec could be improved to make it more DRY, however some areas are intentionally
 * repetitive in order to make the code as easy to read as possible. The spec includes some conditional testing.
 * If we actually owned and had full control of this app, I would not approach testing in this manner. It's best
 * to fully own and control the app so that we can control its state before and after executing steps/test cases.
 * If I did have control of the application, my approach would be different. Instead of conditional testing seen
 * in the if/else blocks, I would rather control the values (for example Issue count) and validate that they are
 * the expected count.
 */

describe('/k3s-io/k3s top nav bar GETs', () => {
  it('Navigates to /k3s-io/k3s and performs basic checks against the top tabs nav bar', () => {
    // Visit /k3s-io/k3s and ensure page loads
    cy.visit('https://github.com/k3s-io/k3s')

    // ##### CODE TAB #####

    // Verify the Code tab is selected (has aria-current attribute)
    cy.get('#code-tab').should('have.attr', 'aria-current', 'page')
    // Verify the Code tab "octicon-code" svg image is present
    cy.get('#code-tab > svg').should('have.class', 'octicon-code')
    // Verify that the next tab is NOT selected (does NOT have aria-current attribute)
    // NOTE: This could be abstracted. A helper function could be provided a parameter indicating the tab we want to check is active or not.
    //       Such a function could also check that all other tabs are not active, however it's preferable to only do assertions in the spec.
    cy.get('#issues-tab').should('not.have.attr', 'aria-current', 'page')

    // ##### ISSUES TAB #####

    // Click on the Issues tab
    cy.get('#issues-tab').click()
    // Verify the url now includes /issues
    cy.url().should('include', '/issues')
    // Verify the Issues tab is selected (has aria-current attribute)
    cy.get('#issues-tab').should('have.attr', 'aria-current', 'page')
    // Verify the Issues tab "octicon-issue-opened" svg image is present. Note this image is shown whether or not there are open issues.
    cy.get('#issues-tab > svg').should('have.class', 'octicon-issue-opened')

    // Check if #issues-repo-tab-count is greater than 0 (which is typical), verify it is visible, else that it is hidden
    // NOTE: Optionally alter cy.visit line to nav to https://github.com/davidnuzik/david-automation-demo if you want to trigger else block
    // TODO: Test if GitHub links references to files in a project, like: https://github.com/davidnuzik/david-automation-demo/cypress/lib/helpers/tabCountCheck.js
    //       If it does, it may be best if we make this spec (and throughout the project) more DRY. However, it's best if the user can nav to the helper easily in GitHub...
    cy.get('#issues-tab > #issues-repo-tab-count').invoke('text').then(parseInt).then(($issueCount) => {
      if ($issueCount > 0) {
        cy.get('#issues-tab > #issues-repo-tab-count').should('be.visible')
      } else {
        cy.get('#issues-tab > #issues-repo-tab-count').should('be.hidden')
      }
    })

    // ##### PULL REQUESTS TAB #####
    // Click on the Pull requests tab. Verify is active, has correct svg, and url now contains /pulls
    cy.get('#pull-requests-tab').click()
    cy.url().should('include', '/pulls')
    // TODO: DRYness? See above issues-tab if/else block.
    // TODO: Continue with WIP spec. Wrap up Pull Requests check and then move on to next tab and so on.

  })
})