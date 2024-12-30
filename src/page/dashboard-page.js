const { expect } = require('@playwright/test');
const { MasterPage } = require('./master-page');
const { APP_URL } = require('../utils/config-utils');

exports.DashboardPage = class DashboardPage extends MasterPage {
    logoTextXpath = "//div[contains(concat(' ',@class,' '),' logo ') and .//text()[normalize-space()='EVERSHOP']]";

    constructor(page) {
        super(page);
    }

    async isOnPage() {
        await expect(this.page.locator(this.logoTextXpath)).toBeVisible();
    }
}