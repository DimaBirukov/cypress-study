export const bank_accounts_page = {
    accpunts_list: '[data-test="bankaccount-list"]',
    create_account_btn: '[data-test="bankaccount-new"]',
    bank_name_field: '#bankaccount-bankName-input',
    routing_number_field: '#bankaccount-routingNumber-input',
    account_number_field: '#bankaccount-accountNumber-input',
    save_btn: '[data-test="bankaccount-submit"]',
    bank_name_error_massage: '#bankaccount-bankName-input-helper-text',
    routing_number_error_massage: '#bankaccount-routingNumber-input-helper-text',
    account_number_error_massage: '#bankaccount-accountNumber-input-helper-text',

    getDeleteBtnByAccountName: function(name) {
        return `//*[text()="${name}"]//ancestor::*[contains(@data-test,"bankaccount-list-item")]//*[@data-test="bankaccount-delete"]`
    }
}