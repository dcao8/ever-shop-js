const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const path = require('path');
const { APP_URL } = require('../utils/config-utils');

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

    async getProductId() {
        this.page.route('**', async (route, request) => {
            if (request.url().includes('/api/products')) {
                const response = await route.fetch();
                const json = await response.json();
                this.productId = json.data.uuid;
                await route.fulfill({ response, json });
            } else {
                route.continue();
            }
        });
    }

    async createProductByRequest(dataRequest) {
        const response = await this.page.request.post(`${APP_URL}/api/products`, {
            data: dataRequest
        });
        const jsonResponse = await response.json();
        this.productId = jsonResponse.data.uuid;
    }

    async cleanUpData() {
        await this.page.request.delete(`${APP_URL}/api/products/${this.productId}`);
    }
}