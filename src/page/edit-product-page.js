const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const path = require('path');

exports.EditProductPage = class EditProductPage extends MasterPage {


    constructor(page) {
        super(page);
    }

    async isOnPage(productName) {
        pageHeaderXpath = `//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='Editting ${productName}']]`;
        await expect(this.page.locator(this.pageHeaderXpath)).toBeVisible();
    }
}