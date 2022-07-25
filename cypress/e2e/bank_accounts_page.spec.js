import { sign_in_page } from "../selectors/sign_in_page";
import { navigation_bar } from "../selectors/navigation_bar";
import { bank_accounts_page } from "../selectors/bank_accounts_page";

describe('UI tests for bank accounts page', () => {

    beforeEach('visiting sign in page', () => {
      cy.visit('/')
      cy.clearCookies()
    })

// 1. creates a new bank account
    it("creates a new bank account", function() {
        const bank = {
            bank_name: uniqueValue('Test Bank'), 
            routing_number:  Cypress._.random(0, 1e9), 
            account_number:  Cypress._.random(0, 1e9), 
        }

        cy.fixture('user_test_data').its('test_user').then((user) => {
            cy.login(user.username, user.password)
        })

        cy.get(navigation_bar.bank_accounts_nav_btn).click()
        cy.createBankAccount(bank)

        cy.get(bank_accounts_page.accpunts_list).contains(bank.bank_name)
    })


// 2. should display bank account form errors
    it("should display bank account form errors", function() {
        cy.fixture('user_test_data').its('test_user').then((user) => {
            cy.login(user.username, user.password)
        })

        cy.get(navigation_bar.bank_accounts_nav_btn).click()
        cy.get(bank_accounts_page.create_account_btn).click()

        cy.get(bank_accounts_page.bank_name_field).click().blur()
        cy.get(bank_accounts_page.bank_name_error_massage).should('have.text', 'Enter a bank name')

        cy.get(bank_accounts_page.bank_name_field).type('T').blur()
        cy.get(bank_accounts_page.bank_name_error_massage).should('have.text', 'Must contain at least 5 characters')

        cy.get(bank_accounts_page.routing_number_field).click().blur()
        cy.get(bank_accounts_page.routing_number_error_massage).should('have.text', 'Enter a valid bank routing number')

        cy.get(bank_accounts_page.routing_number_field).type('1').blur()
        cy.get(bank_accounts_page.routing_number_error_massage).should('have.text', 'Must contain a valid routing number')

        cy.get(bank_accounts_page.account_number_field).click().blur()
        cy.get(bank_accounts_page.account_number_error_massage).should('have.text', 'Enter a valid bank account number')

        cy.get(bank_accounts_page.account_number_field).type('1').blur()
        cy.get(bank_accounts_page.account_number_error_massage).should('have.text', 'Must contain at least 9 digits')
    })


// 3. user should be able to delete a bank account
    it("user should be able to delete a bank account", function() {
        const bank = {
            bank_name: uniqueValue('Test Bank'), 
            routing_number:  Cypress._.random(0, 1e9), 
            account_number:  Cypress._.random(0, 1e9), 
        }

        cy.fixture('user_test_data').its('test_user').then((user) => {
            cy.login(user.username, user.password)
        })

        cy.get(navigation_bar.bank_accounts_nav_btn).click()
        cy.createBankAccount(bank)

        cy.get(bank_accounts_page.accpunts_list).contains(bank.bank_name)
        cy.xpath(bank_accounts_page.getDeleteBtnByAccountName(bank.bank_name)).click()
        cy.get(bank_accounts_page.accpunts_list).contains(`${bank.bank_name} (Deleted)`)
    })
})

function uniqueValue (value) {
    const uid = () => Cypress._.random(0, 1e6)
    let uvalue = value + uid();
    return uvalue;
}


