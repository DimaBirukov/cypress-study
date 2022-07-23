const { it } = require("mocha");
const {sign_in_page} = require("../selectors/sign_in_page");

describe('UI tests for sign in page', () => {

  before('visiting sign in page', () => {
    cy.visit('/')
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
    cy.get(sign_in_page.username_field).should('be.visible').should('be.not.disabled')
  })


  // 2. should show typeable Password field
  it("should show typeable Password field", function() {
    cy.get(sign_in_page.password_field).should('be.visible').should('be.not.disabled')
  })


  // 3. should show Username and Password placeholders
  it("should show Username and Password placeholders", function() {
    cy.get(sign_in_page.username_label).should('be.visible').should('have.text', 'Username')
    cy.get(sign_in_page.password_label).should('be.visible').should('have.text', 'Password')
  })


  // 4. should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value
  it("should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value", function() {
    cy.get(sign_in_page.username_field).click()
    cy.get(sign_in_page.password_field).click()
    cy.get(sign_in_page.username_error_massage).should('be.visible').should('have.text', 'Username is required')
  })


  // 5. check "Remember me" checkbox
  it("check 'Remember me' checkbox", function() {
    cy.get(sign_in_page.remember_me_checkbox).click()
    cy.get(sign_in_page.remember_me_input).should('be.checked')
  })


  // 6. should show disabled by default sign in btn
  it("should show disabled by default sign in btn", function() {
    cy.get(sign_in_page.sing_in_btn).should('be.visible').should('be.disabled')
  })


  // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn
  it("should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn", function() {
    cy.get(sign_in_page.sing_up_btn).should('be.visible').should('be.not.disabled')
  })


  // 8. should show Cypress copyright link that leads to 'https://www.cypress.io/'
  it("should show Cypress copyright link that leads to 'https://www.cypress.io/'", function() {
    cy.get(sign_in_page.cypress_logo).should('be.visible').should('have.attr', 'href', 'https://cypress.io')
  })
})