const { expect } = require("allure-playwright");

exports.MasterPage = class MasterPage {
    constructor(page) {
        this.page = page;
    }

    async inputTextByLabel(label, value) {
        let inputXpath = `(//label[./text()[normalize-space()='${label}']]/following::input)[1]`;
        await this.page.locator(inputXpath).fill(value);
    }

    async inputTextAreaByLabel(label, value) {
        let inputXpath = `(//label[./text()[normalize-space()='${label}']]/following::textarea)[1]`;
        await this.page.locator(inputXpath).fill(value);
    }

    async clickButtonByLabel(label) {
        let buttonXpath = `//button[.//text()[normalize-space()='${label}']]`;
        await this.page.locator(buttonXpath).click();
    };

    async selectMenuItem(menuItem) {
        let menuItemXpath = `//ul[contains(concat(' ',@class,' '), ' item-group ')]//a[.//text()[normalize-space()='${menuItem}']]`;
        await this.page.locator(menuItemXpath).click();
    }

    async selectCategory(label, value){
        let categoryLinkXpath=`//div[.//text()[normalize-space()='${label}']]//a[.//text()[normalize-space()='Select category']]`;
        await this.page.locator(categoryLinkXpath).click();
        let categoryXpath=`//div[.//text()[normalize-space()='${label}']]//a[.//text()[normalize-space()='${value}']]`;
        await this.page.locator(categoryXpath).click();
    }

    async selectDescriptionType(typeNUmber){
        let xpath=`//div[./label[.//text()[normalize-space()='Description']]]//a[${typeNUmber}]`;
        await this.page.locator(xpath).click();
    }

    async inputDescription(content){
        let xpath=`//div[./label[.//text()[normalize-space()='Description']]]//div[@data-placeholder-active='Type / to see the available blocks']`;
        await this.page.locator(xpath).fill(content);
    }

    async selectOptionByLabel(label, option){
        let xpath=`//div[./label[.//text()[normalize-space()='${label}']]]//select`;
        await this.page.locator(xpath).selectOption(option);
    }

    async selectRadioButtonByLabel(label, option){
        let xpath=`//div[./label[.//text()[normalize-space()='${label}']]]//label[.//text()[normalize-space()='${option}']]`;
        await this.page.locator(xpath).click();
    }

    async verifyNotification(message){
        let xpath=`//div[@role='alert' and .//text()[normalize-space()='${message}']]`;
        await expect(this.page.locator(xpath)).toBeVisible();
    }
}
