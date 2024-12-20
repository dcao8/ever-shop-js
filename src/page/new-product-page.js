const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const path = require('path');

exports.NewProductPage = class NewProductPage extends MasterPage {
    pageHeaderXpath = "//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='Create A New Product']]";
    productId;
    constructor(page) {
        super(page);
    }

    async isOnPage() {
        await expect(this.page.locator(this.pageHeaderXpath)).toBeVisible();
    }

    async uploadImageFile(imgPath) {
        let xpath = "//*[@id='images']//input[@type='file']";
        let pathToUploadFile = path.join(process.cwd(), imgPath);
        await this.page.locator(xpath).setInputFiles(pathToUploadFile);
    }

    async selectAttribute(label, option) {
        let xpath = `//tr[./td[.//text()[normalize-space()='${label}']]]//select`;
        await this.page.locator(xpath).selectOption(option);

    }

    async selectOptionOnAttributeGroup(option) {
        let xpath = `//select[@id='group_id']`;
        await this.page.locator(xpath).selectOption(option);
    }

    async inputRandomSku() {
        let sku = `${new Date().getTime()}`;
        await this.inputTextByLabel('SKU', sku);
    }

    async inputRandomUrlKey() {
        let urlKey = `UrlKey${new Date().getTime()}`;
        await this.inputTextByLabel('Url key', urlKey);
    }
}