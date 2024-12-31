const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { ProductPage } = require('../src/page/product-page');
const { newProductData } = require('../src/test-data/new-product-request-data');
const { NewProductPage } = require('../src/page/new-product-page');

let adminLoginPage;
let dashboardPage;
let productPage
let newProductPage;

test.beforeEach('beforeEach', async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    dashboardPage = new DashboardPage(page);
    productPage = new ProductPage(page);
    newProductPage = new NewProductPage(page);
})

test.afterEach('afterEach', async ({ page }) => {
    await newProductPage.cleanUpData();
})

test('Verify admin is able to delete product', async ({ page }) => {
    await iStep('User login to system as Admin', adminLoginPage, adminLoginPage.loginAsAdmin);
    await iStep(`User should be on Dashboard page`, dashboardPage, dashboardPage.isOnPage);
    await iStep(`User Create product by API Request`, newProductPage, newProductPage.createProductByRequest, newProductData);
    await iStep('User go to Product page', productPage, productPage.open);
    await iStep(`User should be on Product page`, productPage, productPage.isOnPage);
    await iStep(`User select Product: ${newProductData['name']}`, productPage, productPage.selectCheckboxInTableByName, newProductData['name']);
    await iStep(`User click Delete button on Table`, productPage, productPage.clickButtonInTableByLabel, 'Delete');
    await iStep(`Dialog should be displayed with message: Delete 1 products`, productPage, productPage.verifyDialogMessage, 'Delete 1 products');
    await iStep(`User click Delete on Dialog`, productPage, productPage.clickButtonOnDialogByLabel, 'Delete');
});