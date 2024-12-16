const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');

exports.AdminLoginPage = class AdminLoginPage extends MasterPage {
    url = 'http://localhost:3000/admin/login';

    constructor(page) {
        super(page);
    }

    async open() {
        await this.page.goto(this.url);
    }

    async isOnPage() {
        await expect(this.page).toHaveTitle('Admin Login');
    }

    async isLoginFailed() {
        let errorXpath = `//div[./text()[normalize-space()='Invalid email or password']]`;
        await expect(this.page.locator(errorXpath)).toBeVisible();
    }

    async verifyErrorLabel(field, expectedError){
        let errorXpath = `(//label[./text()='${field}']/following::div[contains(concat(' ',@class,' '),' field-error ')])[1]`;
          await expect.soft(this.page.locator(errorXpath)).toHaveText(expectedError);
    }

    async loginAsAdmin(email, password){
        await this.open();
        await this.isOnPage();
        await this.inputTextByLabel('Email', email);
        await this.inputTextByLabel('Password', password);
        await this.clickButtonByLabel('SIGN IN');
    }
}