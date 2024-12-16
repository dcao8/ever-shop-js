const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const path = require('path');

exports.NewCategoryPage = class NewCategoryPage extends MasterPage {
    url = 'http://localhost:3000/admin/categories/new';
    pageHeaderXpath = "//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='Create A New category']]";

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

    async selectRadioButtonByLabel(label, option){
        let xpath=`(//h3[.//text()[normalize-space()='${label}']]//following::label[.//text()[normalize-space()='${option}']])[1]`;
        await this.page.locator(xpath).click();
    }
}