const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');

exports.ProductPage = class ProductPage extends MasterPage {
    url = 'http://localhost:3000/admin/products';
    pageHeaderXpath = "//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='Products']]";

    constructor(page) {
        super(page);
    }

    async open() {
        this.page.goto(this.url);
    }

    async isOnPage() {
        await expect(this.page.locator(this.pageHeaderXpath)).toBeVisible();
    }
}