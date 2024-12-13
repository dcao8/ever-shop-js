exports.MasterPage = class MasterPage {
    constructor(page) {
        this.page = page;
    }

    async inputTextByLabel(label, value) {
        let inputXpath = `(//label[./text()[normalize-space()='${label}']]/following::input)[1]`;
        await this.page.locator(inputXpath).fill(value);
    }

    async clickButtonByLabel(label) {
        let buttonXpath = `//button[.//text()[normalize-space()='${label}']]`;
        await this.page.locator(buttonXpath).click();
    };
}
