const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { NewCategoryPage } = require('../src/page/new-category-page');

let adminLoginPage;
let dashboardPage;
let newCategoryPage

test.beforeEach('beforeEach', async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    dashboardPage = new DashboardPage(page);
    newCategoryPage = new NewCategoryPage(page);
    await newCategoryPage.getCategoryId();
});

test.afterEach('afterEach', async ({ page }) => {
    await newCategoryPage.cleanUpData();
})

test('Verify admin is able to create new category', async ({ page }) => {
    await iStep('User login to system as Admin', adminLoginPage, adminLoginPage.loginAsAdmin);
    await iStep(`User should be on Dashboard page`, dashboardPage, dashboardPage.isOnPage);
    await iStep('User goto Create New Category page', newCategoryPage, newCategoryPage.open);
    await iStep(`User should be on New Category page`, newCategoryPage, newCategoryPage.isOnPage);
    await iStep(`User input Name: Shoes`, newCategoryPage, newCategoryPage.inputTextByLabel, 'Name', 'Shoes');
    await iStep(`User select 'Kids' Parent category`, newCategoryPage, newCategoryPage.selectCategory, 'Parent category', 'Kids');
    await iStep(`User select the first Description type`, newCategoryPage, newCategoryPage.selectDescriptionType, '1');
    await iStep(`User input the following Description`, newCategoryPage, newCategoryPage.inputDescription, 'New Category is Shoes');
    await iStep(`User input Url key: MyUrlkey`, newCategoryPage, newCategoryPage.inputTextByLabel, 'Url key', 'MyCategoryUrlkey');
    await iStep(`User input Meta title: My Category Meta title`, newCategoryPage, newCategoryPage.inputTextByLabel, 'Meta title', 'My Category Meta title');
    await iStep(`User input Meta keywords: My Category Meta keywords`, newCategoryPage, newCategoryPage.inputTextByLabel, 'Meta keywords', 'My Category Meta keywords');
    await iStep(`User input Meta description: My Category Meta description`, newCategoryPage, newCategoryPage.inputTextAreaByLabel, 'Meta description', 'My Category Meta description');
    await iStep(`User upload Category image`, newCategoryPage, newCategoryPage.uploadImageFile, 'src/test-data/bitisXanh.png');
    await iStep(`User select Category Status is Enabled`, newCategoryPage, newCategoryPage.selectRadioButtonByLabel, 'Status', 'Disabled');
    await iStep(`User select Category Include In Store Menu is No`, newCategoryPage, newCategoryPage.selectRadioButtonByLabel, 'Include In Store Menu', 'No');
    await iStep(`User select Category Show Products is No`, newCategoryPage, newCategoryPage.selectRadioButtonByLabel, 'Show Products?', 'No');
    await iStep(`User select Save button`, newCategoryPage, newCategoryPage.clickButtonByLabel, 'Save');
    await iStep(`User should see notification: `, newCategoryPage, newCategoryPage.verifyNotification, 'Category saved successfully!');
});