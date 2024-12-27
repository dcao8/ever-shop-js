const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const { LOGIN_PATH, APP_URL, EMAIL_ADMIN, PASSWORD_ADMIN } = require('../utils/config-utils');

exports.AdminLoginPage = class AdminLoginPage extends MasterPage {
    url = `${APP_URL}${LOGIN_PATH}`;

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

    async verifyErrorLabel(field, expectedError) {
        let errorXpath = `(//label[./text()='${field}']/following::div[contains(concat(' ',@class,' '),' field-error ')])[1]`;
        await expect.soft(this.page.locator(errorXpath)).toHaveText(expectedError);
    }

    async loginAsAdmin() {
        await this.open();
        await this.isOnPage();
        await this.inputTextByLabel('Email', EMAIL_ADMIN);
        await this.inputTextByLabel('Password', PASSWORD_ADMIN);
        await this.clickButtonByLabel('SIGN IN');
    }
}