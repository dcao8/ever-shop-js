const { expect } = require("allure-playwright");
const { APP_URL } = require("../utils/config-utils");

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

    async selectCategory(label, value) {
        let categoryLinkXpath = `//div[.//text()[normalize-space()='${label}']]//a[.//text()[normalize-space()='Select category']]`;
        await this.page.locator(categoryLinkXpath).click();
        let categoryXpath = `//div[.//text()[normalize-space()='${label}']]//a[.//text()[normalize-space()='${value}']]`;
        await this.page.locator(categoryXpath).click();
    }

    async selectDescriptionType(typeNUmber) {
        let xpath = `//div[./label[.//text()[normalize-space()='Description']]]//a[${typeNUmber}]`;
        await this.page.locator(xpath).click();
    }

    async inputDescription(content) {
        let xpath = `//div[./label[.//text()[normalize-space()='Description']]]//div[@data-placeholder-active='Type / to see the available blocks']`;
        await this.page.locator(xpath).fill(content);
    }

    async selectOptionByLabel(label, option) {
        let xpath = `//div[./label[.//text()[normalize-space()='${label}']]]//select`;
        await this.page.locator(xpath).selectOption(option);
    }

    async selectRadioButtonByLabel(label, option) {
        let xpath = `//div[./label[.//text()[normalize-space()='${label}']]]//label[.//text()[normalize-space()='${option}']]`;
        await this.page.locator(xpath).click();
    }

    async verifyNotification(message) {
        let xpath = `//div[@role='alert']`;
        await expect(this.page.locator(xpath)).toHaveText(message);
    }

    async selectCheckboxInTableByName(name) {
        let xpath = `//table//tr[.//a[text()[normalize-space()='${name}']]]//label`;
        let isChecked = await this.page.locator(xpath).isChecked();
        if (!isChecked) {
            await this.page.locator(xpath).click();
        }
    }

    async selectItemInTableByName(name) {
        let xpath = `//table//a[text()[normalize-space()='${name}']]`;
        await this.page.locator(xpath).click();
    }

    async clickButtonInTableByLabel(label) {
        let buttonXpath = `//table//a[.//text()[normalize-space()='${label}']]`;
        await this.page.locator(buttonXpath).click();
    };

    async verifyDialogMessage(message) {
        let xpath = `//div[@role='dialog']//h2[contains(concat(' ',@class,' '),' card-title ')]`;
        await expect(this.page.locator(xpath)).toHaveText(message);
    }

    async clickButtonOnDialogByLabel(label) {
        let buttonXpath = `//div[@role='dialog']//button[.//text()[normalize-space()='${label}']]`;
        await this.page.locator(buttonXpath).click();
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

    async cleanUpData() {
        await this.page.request.delete(`${APP_URL}/api/products/${this.productId}`);
    }
}
