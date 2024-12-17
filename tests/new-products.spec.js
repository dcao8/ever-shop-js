const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');
const { loginSuccessfullyTestData, validateLoginFormTestData, loginFailedTestData } = require('../src/test-data/admin-login-test-data');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { beforeEach } = require('node:test');
const { NewProductPage } = require('../src/page/new-product-page');
const { EditProductPage } = require('../src/page/edit-product-page');

let adminLoginPage;
let dashboardPage;
let newProductPage
let editProductPage

test.beforeEach('beforeEach', async ({ page }) => {
  adminLoginPage = new AdminLoginPage(page);
  dashboardPage = new DashboardPage(page);
  newProductPage = new NewProductPage(page);
  editProductPage = new EditProductPage(page);
  await newProductPage.getProductId();
})

test.afterEach('afterEach', async ({ page }) => {
  await newProductPage.cleanUpData();
})

loginSuccessfullyTestData.forEach(({ email, password }) => {
  test('Verify admin is able to create new product', async ({ page }) => {
    await iStep('User login to system as Admin', adminLoginPage, adminLoginPage.loginAsAdmin, email, password);
    await iStep(`User should be on Dashboard page`, dashboardPage, dashboardPage.isOnPage);
    await iStep('User select menu item "New Product"', dashboardPage, dashboardPage.selectMenuItem, 'New Product');
    await iStep(`User should be on New Product page`, newProductPage, newProductPage.isOnPage);
    await iStep(`User input Name:`, newProductPage, newProductPage.inputTextByLabel, 'Name', 'Giày Thể Thao Nam Biti’s Hunter Running LiteDual');
    await iStep(`User input a Random SKU:`, newProductPage, newProductPage.inputRandomSku);
    await iStep(`User input Price:`, newProductPage, newProductPage.inputTextByLabel, 'Price', '800');
    await iStep(`User input Weight:`, newProductPage, newProductPage.inputTextByLabel, 'Weight', '0.2');
    await iStep(`User select 'Men' Product Category`, newProductPage, newProductPage.selectCategory, 'Category', 'Men');
    await iStep(`User select option Taxable Goods in Tax class`, newProductPage, newProductPage.selectOptionByLabel, 'Tax class', 'Taxable Goods');
    await iStep(`User select the first Description type`, newProductPage, newProductPage.selectDescriptionType, '1');
    await iStep(`User input the following Description`, newProductPage, newProductPage.inputDescription, 'Giày Thể Thao Nam Biti’s Hunter Running LiteDual - Original Edition 2K24 HSM004801XLC');
    await iStep(`User upload product image`, newProductPage, newProductPage.uploadImageFile, 'src/test-data/bitisXanh.png');
    await iStep(`User input Url key:`, newProductPage, newProductPage.inputRandomUrlKey);
    await iStep(`User input Meta title:`, newProductPage, newProductPage.inputTextByLabel, 'Meta title', 'My Meta title');
    await iStep(`User input Meta keywords:`, newProductPage, newProductPage.inputTextByLabel, 'Meta keywords', 'My Meta keywords');
    await iStep(`User input Meta description:`, newProductPage, newProductPage.inputTextAreaByLabel, 'Meta description', 'My Meta description');
    await iStep(`User select Product Status is Enabled`, newProductPage, newProductPage.selectRadioButtonByLabel, 'Status', 'Enabled');
    await iStep(`User select Product Visibility is Visible`, newProductPage, newProductPage.selectRadioButtonByLabel, 'Visibility', 'Visible');
    await iStep(`User select Product Manage stock is Yes`, newProductPage, newProductPage.selectRadioButtonByLabel, 'Manage stock?', 'No');
    await iStep(`User select Product Stock availability is Yes`, newProductPage, newProductPage.selectRadioButtonByLabel, 'Stock availability', 'No');
    await iStep(`User input Quantity:`, newProductPage, newProductPage.inputTextByLabel, 'Quantity', '10');
    await iStep(`User select option Default in Attribute group`, newProductPage, newProductPage.selectOptionOnAttributeGroup, 'Default');
    await iStep(`User select product attribute color`, newProductPage, newProductPage.selectAttribute, 'Color', 'Yellow');
    await iStep(`User select product attribute size`, newProductPage, newProductPage.selectAttribute, 'Size', 'XL');
    await iStep(`User select Save button`, newProductPage, newProductPage.clickButtonByLabel, 'Save');
    await iStep(`User should see notification: `, newProductPage, newProductPage.verifyNotification, 'Product saved successfully!');
  });
});