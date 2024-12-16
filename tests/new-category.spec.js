const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { beforeEach } = require('node:test');
const { NewCategoryPage } = require('../src/page/new-category-page');
const { loginSuccessfullyTestData } = require('../src/test-data/admin-login-test-data');

let adminLoginPage;
let dashboardPage;
let newCategoryPage

test.beforeEach('beforeEach', async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    dashboardPage = new DashboardPage(page);
    newCategoryPage = new NewCategoryPage(page);
})

loginSuccessfullyTestData.forEach(({ email, password }) => {
    test('Verify admin is able to create new category', async ({ page }) => {
        await iStep('User login to system as Admin', adminLoginPage.loginAsAdmin(email, password));
        await iStep(`User should be on Dashboard page`, dashboardPage.isOnPage());
        await iStep('User goto Create New Category page', newCategoryPage.open());
        await iStep(`User should be on New Category page`, newCategoryPage.isOnPage());
        await iStep(`User input Name: Shoes`, newCategoryPage.inputTextByLabel('Name', 'Shoes'));
        await iStep(`User select 'Kids' Parent category`, newCategoryPage.selectCategory('Parent category', 'Kids'));
        await iStep(`User select the first Description type`, newCategoryPage.selectDescriptionType('1'));
        await iStep(`User input the following Description`, newCategoryPage.inputDescription('New Category is Shoes'));
        await iStep(`User input Url key: MyUrlkey`, newCategoryPage.inputTextByLabel('Url key', 'MyCategoryUrlkey'));
        await iStep(`User input Meta title: My Category Meta title`, newCategoryPage.inputTextByLabel('Meta title', 'My Category Meta title'));
        await iStep(`User input Meta keywords: My Category Meta keywords`, newCategoryPage.inputTextByLabel('Meta keywords', 'My Category Meta keywords'));
        await iStep(`User input Meta description: My Category Meta description`, newCategoryPage.inputTextAreaByLabel('Meta description', 'My Category Meta description'));
        await iStep(`User upload Category image`, newCategoryPage.uploadImageFile('src/test-data/bitisXanh.png'));
        await iStep(`User select Category Status is Enabled`, newCategoryPage.selectRadioButtonByLabel('Status', 'Disabled'));
        await iStep(`User select Category Include In Store Menu is No`, newCategoryPage.selectRadioButtonByLabel('Include In Store Menu', 'No'));
        await iStep(`User select Category Show Products is No`, newCategoryPage.selectRadioButtonByLabel('Show Products?', 'No'));
        await iStep(`User select Save button`, newCategoryPage.clickButtonByLabel('Save'));
        await iStep(`User should see notification: `, newCategoryPage.verifyNotification('Category saved successfully!'));
    });
});