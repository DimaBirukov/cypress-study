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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";
import { onboarding_modal } from "../selectors/onboarding_modal";
import { bank_accounts_page } from "../selectors/bank_accounts_page";

Cypress.Commands.add('login', (username, password) => { 
    cy.get(sign_in_page.username_field).type(username)
    cy.get(sign_in_page.password_field).type(password)
    cy.get(sign_in_page.sign_in_btn).click()    
})

Cypress.Commands.add('singUp', (user) => {
    cy.get(sign_in_page.sign_up_btn).click()

    cy.get(sign_up_page.first_name_field).type(user.first_name)
    cy.get(sign_up_page.last_name_field).type(user.last_name)
    cy.get(sign_up_page.username_field).type(user.username)
    cy.get(sign_up_page.password_field).type(user.password)
    cy.get(sign_up_page.confirm_password_field).type(user.password)
    
    cy.get(sign_up_page.sign_up_btn).click()
})

Cypress.Commands.add('onboarding', (bank) => {
    cy.get(onboarding_modal.title).should('be.visible').contains('Get Started with Real World App')
    cy.get(onboarding_modal.next_btn).click()
    
    cy.get(onboarding_modal.title).should('be.visible').contains('Create Bank Account')
    cy.get(onboarding_modal.bank_name_field).type(bank.bank_name)
    cy.get(onboarding_modal.routing_number_field).type(bank.routing_number)
    cy.get(onboarding_modal.account_number_field).type(bank.account_number)
    cy.get(onboarding_modal.save_btn).click()

    cy.get(onboarding_modal.title).should('be.visible').contains('Finished')
    cy.get(onboarding_modal.next_btn).click()
    cy.get(onboarding_modal.title).should('not.exist')
})

Cypress.Commands.add('createBankAccount', (bank) => {
    cy.get(bank_accounts_page.create_account_btn).click()
    cy.get(bank_accounts_page.bank_name_field).type(bank.bank_name)
    cy.get(bank_accounts_page.routing_number_field).type(bank.routing_number)
    cy.get(bank_accounts_page.account_number_field).type(bank.account_number)
    cy.get(bank_accounts_page.save_btn).click()
})