const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');

exports.DashboardPage = class DashboardPage extends MasterPage {
    logoTextXpath = "//div[contains(concat(' ',@class,' '),' logo ') and .//text()[normalize-space()='EVERSHOP']]";

    constructor(page) {
        super(page);
    }

    async isOnPage() {
        await expect(this.page.locator(this.logoTextXpath)).toBeVisible();
    }

    async isNotOnPage() {
        let isVisible = true;
        try {
            await this.isOnPage();
        } catch (ex) {
            isVisible = false;
        }
        expect(isVisible).toBeFalsy();
    }
}