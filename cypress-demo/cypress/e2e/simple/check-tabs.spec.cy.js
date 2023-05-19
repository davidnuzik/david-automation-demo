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
  // TODO: WIP: Parameterize the various tab class names here and reference as variables below.
  let codeTab = "#code-tab"
  let issuesTab = "#issues-tab"
  let issuesTabCount = "#issues-tab > #issues-repo-tab-count" // > Optional, but ensures <span> element is indeed a child
  let pullsTab = "#pull-requests-tab"
  let pullsTabCount = "#pull-requests-tab > #pull-requests-repo-tab-count"
  let discussionsTab = "#discussions-tab"
  let actionsTab = "#actions-tab"
  let projectsTab = "#projects-tab"
  let projectsTabCount = "#projects-tab > #projects-repo-tab-count"
  let wikiTab = "#wiki-tab"
  let securityTab = "#security-tab"

  it('Navigates to /k3s-io/k3s and performs basic checks against the top tabs nav bar', () => {
    /**
     * NOTE: DRYness -- Code could be abstracted such as in a helper function in several areas, however I have not
     * done this throughout the spec in order to keep all assertions in the spec, which is generally best practice.
     * Also note that if you want to trigger the else blocks for TabCount checks, simply replace the cy.visit url
     * with: https://github.com/davidnuzik/david-automation-demo since the repo does not contain any Issues/pulls/etc
     */
    // TODO: If use /david-automation-demo, though, DISCUSSIONS tab does not exist so test fails! ^^^

    // Visit /k3s-io/k3s and ensure page loads
    cy.visit('https://github.com/k3s-io/k3s')

    // ########## CODE TAB ##########

    // Code tab should be selected, have "octicon-code" svg image, and the issues tab should NOT be selected
    cy.get(codeTab).should('have.attr', 'aria-current', 'page') // Based on testing, aria-current is only used for the current active tab
    cy.get(codeTab + ' > svg').should('have.class', 'octicon-code')
    cy.get(issuesTab).should('not.have.attr', 'aria-current', 'page')

    // ########## ISSUES TAB ##########

    // Click on Issues tab, url should include /issues, tab should be selected, should have "octicon-issue-opened" svg
    // image, and the Pull requests tab should NOT be selected
    cy.get(issuesTab).click()
    cy.url().should('include', '/issues')
    cy.get(issuesTab).should('have.attr', 'aria-current', 'page')
    cy.get(issuesTab + ' > svg').should('have.class', 'octicon-issue-opened') // GitHub shows the "octicon-issue-opened" SVG image whether or not there are open issues
    cy.get(pullsTab).should('not.have.attr', 'aria-current', 'page')

    // Check if #issues-repo-tab-count is greater than 0 (which is typical), verify it is visible, else that it is hidden
    cy.get(issuesTabCount).invoke('text').then(parseInt).then(($issueCount) => {
      if ($issueCount > 0) {
        cy.get(issuesTabCount).should('be.visible')
      } else {
        cy.get(issuesTabCount).should('be.hidden') // GitHub hides this element when count is 0
      }
    })

    // ########## PULL REQUESTS TAB ##########

    // Click on the Pull requests tab, url should include /pulls, tab should be selected, should have 
    // "octicon-git-pull-request" svg image, and the Discussions tab should NOT be selected
    cy.get(pullsTab).click()
    cy.url().should('include', '/pulls')
    cy.get(pullsTab).should('have.attr', 'aria-current', 'page')
    cy.get(pullsTab + ' > svg').should('have.class', 'octicon-git-pull-request')
    cy.get(discussionsTab).should('not.have.attr', 'aria-current', 'page')

    // Check if #pull-requests-repo-tab-count is greater than 0 (which is typical), verify it is visible, else that it is hidden
    cy.get(pullsTabCount).invoke('text').then(parseInt).then(($pullsCount) => {
      if ($pullsCount > 0) {
        cy.get(pullsTabCount).should('be.visible')
      } else {
        cy.get(pullsTabCount).should('be.hidden') // GitHub hides this element when count is 0
      }
    })

    // ########## DISCUSSIONS TAB ##########

    // Click on the Discussions tab, url should include /discussions, tab should be selected, should have 
    // "octicon-comment-discussion" svg image, and the Actions tab should NOT be selected
    cy.get(discussionsTab).click()
    cy.url().should('include', '/discussions')
    cy.get(discussionsTab).should('have.attr', 'aria-current', 'page')
    cy.get(discussionsTab + ' > svg').should('have.class', 'octicon-comment-discussion')
    cy.get(actionsTab).should('not.have.attr', 'aria-current', 'page')

    // ########## ACTIONS TAB ##########

    // Click on the Actions tab, url should include /actions, tab should be selected, should have 
    // "octicon-play" svg image, and the Projects tab should NOT be selected
    cy.get(actionsTab).click()
    cy.url().should('include', '/actions')
    cy.get(actionsTab).should('have.attr', 'aria-current', 'page')
    cy.get(actionsTab + ' > svg').should('have.class', 'octicon-play')
    cy.get(projectsTab).should('not.have.attr', 'aria-current', 'page')

    // ########## PROJECTS TAB ##########

    // Click on the Projects tab, url should include /actions, tab should be selected, should have 
    // "octicon-table" svg image, and the Wiki tab should NOT be selected
    cy.get(projectsTab).click()
    cy.url().should('include', '/projects')
    cy.get(projectsTab).should('have.attr', 'aria-current', 'page')
    cy.get(projectsTab + ' > svg').should('have.class', 'octicon-table')
    cy.get(wikiTab).should('not.have.attr', 'aria-current', 'page')

    // Check if #projects-repo-tab-count is greater than 0 (which is typical), verify it is visible, else that it is hidden
    cy.get(projectsTabCount).invoke('text').then(parseInt).then(($projectsCount) => {
      if ($projectsCount > 0) {
        cy.get(projectsTabCount).should('be.visible')
      } else {
        cy.get(projectsTabCount).should('be.hidden') // GitHub hides this element when count is 0
      }
    })

    // ########## WIKI TAB ##########

    // Click on the Projects tab, url should include /wiki, tab should be selected, should have 
    // "octicon-book" svg image, and the Wiki tab should NOT be selected
    cy.get(wikiTab).click()
    cy.url().should('include', '/wiki')
    cy.get(wikiTab).should('have.attr', 'aria-current', 'page')
    cy.get(wikiTab + ' > svg').should('have.class', 'octicon-book')
    cy.get(securityTab).should('not.have.attr', 'aria-current', 'page')

    // ########## SECURITY TAB ##########
    // TEMP: svg is: octicon-shield
    // TODO: Based on default Cypress browser resolution, SECURITY and INSIGHTS tabs will be hidden and instead on the DETAILS MENU as list objects. As such need to alter locator method
    //       Also note that ideally changing resolution should NOT BREAK TESTS, as such it would be more ideal if there was a function/solver to find. Additionally SECURITY tab also needs
    //       count check as well (just like pulls and issues).
  })
})
