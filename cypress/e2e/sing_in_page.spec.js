import { it } from "mocha";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";
import { navigation_bar } from "../selectors/navigation_bar";
import { bank_accounts_page } from "../selectors/bank_accounts_page";

describe('UI tests for sign in page', () => {

  beforeEach('visiting sign in page', () => {
    cy.visit('/')
    cy.clearCookies()
  })

  it('should show "Real World App logo"', () => {
    cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
  })


  it('should show "Sign in" title', () => {
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
  })

  // Homework 14.07:
  // 1. should show typeable Username field
  it("should show typeable Username field", function() {
    cy.get(sign_in_page.username_field).should('be.visible').and('be.not.disabled')
  })


  // 2. should show typeable Password field
  it("should show typeable Password field", function() {
    cy.get(sign_in_page.password_field).should('be.visible').and('be.not.disabled')
  })


  // 3. should show Username and Password placeholders
  it("should show Username and Password placeholders", function() {
    cy.get(sign_in_page.username_label).should('be.visible').and('have.text', 'Username')
    cy.get(sign_in_page.password_label).should('be.visible').and('have.text', 'Password')
  })


  // 4. should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value
  it("should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value", function() {
    cy.get(sign_in_page.username_field).blur()
    cy.get(sign_in_page.username_error_massage).should('be.visible').and('have.text', 'Username is required')
  })


  // 5. check "Remember me" checkbox
  it("check 'Remember me' checkbox", function() {
    cy.get(sign_in_page.remember_me_checkbox).click()
    cy.get(sign_in_page.remember_me_input).should('be.checked')
  })


  // 6. should show disabled by default sign in btn
  it("should show disabled by default sign in btn", function() {
    cy.get(sign_in_page.username_field).blur()
    cy.get(sign_in_page.sign_in_btn).should('be.visible').and('be.disabled')
  })


  // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn
  it("should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn", function() {
    cy.get(sign_in_page.sign_up_btn).should('be.visible').and('be.not.disabled')
  })


  // 8. should show Cypress copyright link that leads to 'https://www.cypress.io/'
  it("should show Cypress copyright link that leads to 'https://www.cypress.io/'", function() {
    cy.get(sign_in_page.cypress_logo).should('be.visible').and('have.attr', 'href', 'https://cypress.io')
  })


  // Homework 19.07:
  // 1. should allow a visitor to sign-up
  it("should allow a visitor to sign-up", function() {
    const user = {
      first_name: 'Test', 
      last_name: 'User', 
      username: uniqueValue('TestUser'), 
      password: 'Great123#'
    }

    const bank = {
      bank_name: 'Test Bank', 
      routing_number:  Cypress._.random(0, 1e9), 
      account_number:  Cypress._.random(0, 1e9), 
    }

    cy.singUp(user)

    cy.login(user.username, user.password)

    cy.onboarding(bank)
  
    cy.get(navigation_bar.user_full_name).should('have.text', `${user.first_name} ${user.last_name.replace(/\B\w/g, '')}`)
    cy.get(navigation_bar.username).should('have.text', `@${user.username}`)

    cy.get(navigation_bar.bank_accounts_nav_btn).click()
    cy.get(bank_accounts_page.accpunts_list).contains(bank.bank_name)
  })


  // 2. should allow a visitor to login
  it("should allow a visitor to login", function() {
    cy.fixture('user_test_data').its('test_user').then((user) => {
      cy.login(user.username, user.password)
      cy.get(navigation_bar.username).should('have.text', `@${user.username}`)
    })
  })


  // 3. should allow a visitor to logout
  it("should allow a visitor to logout", function() {
    cy.fixture('user_test_data').its('test_user').then((user) => {
      cy.login(user.username, user.password)
    })

    cy.get(navigation_bar.logout_btn).click()
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
  })

  // Homework 21.07
  // 1. should display login errors
  it("should display login errors", function() {
    cy.get(sign_in_page.username_field).blur()
    cy.get(sign_in_page.username_error_massage).should('be.visible').and('have.text', 'Username is required')
    cy.get(sign_in_page.password_field).type('111').blur()
    cy.get(sign_in_page.password_error_massage).should('be.visible').and('have.text', 'Password must contain at least 4 characters')
  })


  // 2. should display signup errors
  it("should display signup errors", function() {
    cy.get(sign_in_page.sign_up_btn).click()

    cy.get(sign_up_page.first_name_field).blur()
    cy.get(sign_up_page.first_name_error_massage).should("be.visible").and("have.text", "First Name is required");

    cy.get(sign_up_page.last_name_field).click().blur();
    cy.get(sign_up_page.last_name_error_massage).should("be.visible").and("have.text", "Last Name is required");

    cy.get(sign_up_page.username_field).click().blur();
    cy.get(sign_up_page.username_error_massage).should("be.visible").and("have.text", "Username is required");

    cy.get(sign_up_page.password_field).click().blur();
    cy.get(sign_up_page.password_error_massage).should("be.visible").and("have.text", "Enter your password");

    cy.get(sign_up_page.confirm_password_field).click().blur();
    cy.get(sign_up_page.confirm_password_error_massage).should("be.visible").and("have.text", "Confirm your password");
    cy.get(sign_up_page.confirm_password_field).type('1').blur()
    cy.get(sign_up_page.confirm_password_error_massage).should("be.visible").and("have.text", "Password does not match");
  })


  // 3. should error for an invalid user
  it("should error for an invalid user", function() {
    cy.get(sign_in_page.username_field).type('Invalid')
    cy.get(sign_in_page.password_field).type('Invalid')
    cy.get(sign_in_page.sign_in_btn).click()
    cy.get(sign_in_page.sign_in_error_massage).should('be.visible').and('contain', 'Username or password is invalid')
  })


  // 4. should error for an invalid password for existing user
  it("should error for an invalid password for existing user", function() {
    cy.get(sign_in_page.username_field).type('TestUser')
    cy.get(sign_in_page.password_field).type('Invalid')
    cy.get(sign_in_page.sign_in_btn).click()
    cy.get(sign_in_page.sign_in_error_massage).should('be.visible').and('contain', 'Username or password is invalid')
  })
})

function uniqueValue (value) {
  const uid = () => Cypress._.random(0, 1e6)
  let uvalue = value + uid();
  return uvalue;
}