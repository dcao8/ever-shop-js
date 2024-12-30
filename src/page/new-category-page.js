const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const path = require('path');
const { NEW_CATEGORY_PATH, APP_URL } = require('../utils/config-utils');

exports.NewCategoryPage = class NewCategoryPage extends MasterPage {
    url = `${APP_URL}${NEW_CATEGORY_PATH}`;
    pageHeaderXpath = "//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='Create A New category']]";
    categoryId;

    constructor(page) {
        super(page);
    }

    async open() {
        await this.page.goto(this.url);
    }

    async isOnPage() {
        await expect(this.page.locator(this.pageHeaderXpath)).toBeVisible();
    }

    async uploadImageFile(imgPath) {
        let xpath = "//input[@id='categoryImageUpload']";
        let pathToUploadFile = path.join(process.cwd(), imgPath);
        await this.page.locator(xpath).setInputFiles(pathToUploadFile);
    }

    async selectRadioButtonByLabel(label, option) {
        let xpath = `(//h3[.//text()[normalize-space()='${label}']]//following::label[.//text()[normalize-space()='${option}']])[1]`;
        await this.page.locator(xpath).click();
    }

    async getCategoryId() {
        this.page.route('**', async (route, request) => {
            if (request.url().includes('/api/categories')) {
                const response = await route.fetch();
                const json = await response.json();
                this.categoryId = json.data.uuid;
                await route.fulfill({ response, json });
            } else {
                route.continue();
            }
        });
    }

    async cleanUpData() {
        await this.page.request.delete(`${APP_URL}/api/categories/${this.categoryId}`);
    }
}