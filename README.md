# David Nuzik's Automation Demo

## Update
This project requires some updates such as for additional coverage with Cypress and Selenium.
Additionally, I have been working a lot with BASH lately in an effort to emulate a TTY for testing of the Wordfence CLI with Defiant using the BATS testing framework. With any luck I'll be able to make that project public this year (2024).

## About
This project was created to demonstrate my ability to pick up a new testing framework and run with it.

I have prior experience using JavaScript and TypeScript with Playwright, as well as other languages and frameworks.
However, I have little or no experience working with the test frameworks demonstrated in this project.
This project enables me to learn more about these test frameworks as well as showcase my knowledge and abilities.

Please note that some or all specs may be heavily commented. This is simply for the sake of explaining the spec and/or
what it does or does not do in order to showcase my understanding of the logic and what the spec accomplishes. I do not
typically comment code except for in certain situations when a brief comment may be necessary to make it easier for the
reader to grasp something. I generally prefer to read and write clean, simple, efficient, and effective code whenever
possible.

## How To Use This Project
Each test framework is in its own folder at the root level, for example `cypress-demo`. Each framework is installed/
initialized in a typical manner (such as what is recommended in the docs). The setup for each demo (config, location
of files, folder structure, modules, etc) may not necessarily be conducive of a public or production-ready test suite,
rather my intent is to show my ability to effectively design and code test cases and explain my rationale
for each test.

### Cypress Demo
This framework was created with E2E tests which can be found at `./cypress-demo/cypress/e2e` or by clicking [here](https://github.com/davidnuzik/david-automation-demo/tree/main/cypress-demo/cypress/e2e).

### Selenium Demo
This framework was configured with Maven and JUnit and tests can be found at `.selenium-demo/src/test/java/com/mycompany/app`
or by clicking [here](https://github.com/davidnuzik/david-automation-demo/tree/main/selenium-demo/src/test/java/com/mycompany/app).
