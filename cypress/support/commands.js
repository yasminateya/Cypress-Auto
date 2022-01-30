// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToApplication', () => {
    
    const userCredentials = {
        "user": {
            "email": Cypress.env('username'),
            "password": Cypress.env('password')
        }
    }

    cy.request('POST', Cypress.env('apiUrl')+'api/users/login', userCredentials)
        .its('body').then( body => {
            const token = body.user.token
            cy.wrap(token).as('token')
            cy.visit('/', {
                onBeforeLoad (win){
                    win.localStorage.setItem('jwtToken', token)
                }
            })

        })
    
})

//open Forms /Form Layouts page
Cypress.Commands.add('openFormLayoutsPage', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.url().should('include', 'forms/layouts')
})

//open Forms /Datepicker page
Cypress.Commands.add('openDatePickerPage', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    cy.url().should('include', 'forms/datepicker')
})

//open Modal & Overlays /Toastr page
Cypress.Commands.add('openToastrPage', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    cy.url().should('include', 'modal-overlays/toastr')
})

//open Modal & Overlays /Tooltip page
Cypress.Commands.add('openTooltipPage', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
    cy.url().should('include', 'modal-overlays/tooltip')
})

//open Tables & Data /Smart table page
Cypress.Commands.add('openSmartTablePage', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    cy.url().should('include', 'tables/smart-table')
})
