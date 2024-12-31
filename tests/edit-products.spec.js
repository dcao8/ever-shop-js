const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { EditProductPage } = require('../src/page/edit-product-page');
const { ProductPage } = require('../src/page/product-page');
const { newProductData } = require('../src/test-data/new-product-request-data');
const { NewProductPage } = require('../src/page/new-product-page');

let adminLoginPage;
let dashboardPage;
let productPage;
let newProductPage;
let editProductPage;

test.beforeEach('beforeEach', async ({ page }) => {
  adminLoginPage = new AdminLoginPage(page);
  dashboardPage = new DashboardPage(page);
  productPage = new ProductPage(page);
  newProductPage = new NewProductPage(page);
  editProductPage = new EditProductPage(page);
})

test.afterEach('afterEach', async ({ page }) => {
  await newProductPage.cleanUpData();
})

test('Verify admin is able to create new product', async ({ page }) => {
  await iStep('User login to system as Admin', adminLoginPage, adminLoginPage.loginAsAdmin);
  await iStep(`User should be on Dashboard page`, dashboardPage, dashboardPage.isOnPage);
  await iStep(`User Create product by API Request`, newProductPage, newProductPage.createProductByRequest, newProductData);
  await iStep('User go to Product page', productPage, productPage.open);
  await iStep(`User should be on Product page`, productPage, productPage.isOnPage);
  await iStep(`User select product: ${newProductData['name']}`, productPage, productPage.selectItemInTableByName, newProductData['name']);
  await iStep(`User should be on Edit Product page`, editProductPage, editProductPage.isOnPage, newProductData['name']);
  await iStep(`User input Name:`, editProductPage, editProductPage.inputTextByLabel, 'Name', 'Giày Thể Thao Nam Biti’s Hunter Running LiteDual');
  await iStep(`User input a Random SKU:`, editProductPage, editProductPage.inputRandomSku);
  await iStep(`User input Price:`, editProductPage, editProductPage.inputTextByLabel, 'Price', '800');
  await iStep(`User input Weight:`, editProductPage, editProductPage.inputTextByLabel, 'Weight', '0.2');
  await iStep(`User select 'Men' Product Category`, editProductPage, editProductPage.selectCategory, 'Category', 'Men');
  await iStep(`User select option Taxable Goods in Tax class`, editProductPage, editProductPage.selectOptionByLabel, 'Tax class', 'Taxable Goods');
  await iStep(`User select the first Description type`, editProductPage, editProductPage.selectDescriptionType, '1');
  await iStep(`User input the following Description`, editProductPage, editProductPage.inputDescription, 'Giày Thể Thao Nam Biti’s Hunter Running LiteDual - Original Edition 2K24 HSM004801XLC');
  await iStep(`User upload product image`, editProductPage, editProductPage.uploadImageFile, 'src/test-data/bitisXanh.png');
  await iStep(`User input Url key:`, editProductPage, editProductPage.inputRandomUrlKey);
  await iStep(`User input Meta title:`, editProductPage, editProductPage.inputTextByLabel, 'Meta title', 'My Meta title');
  await iStep(`User input Meta keywords:`, editProductPage, editProductPage.inputTextByLabel, 'Meta keywords', 'My Meta keywords');
  await iStep(`User input Meta description:`, editProductPage, editProductPage.inputTextAreaByLabel, 'Meta description', 'My Meta description');
  await iStep(`User select Product Status is Enabled`, editProductPage, editProductPage.selectRadioButtonByLabel, 'Status', 'Enabled');
  await iStep(`User select Product Visibility is Visible`, editProductPage, editProductPage.selectRadioButtonByLabel, 'Visibility', 'Visible');
  await iStep(`User select Product Manage stock is Yes`, editProductPage, editProductPage.selectRadioButtonByLabel, 'Manage stock?', 'No');
  await iStep(`User select Product Stock availability is Yes`, editProductPage, editProductPage.selectRadioButtonByLabel, 'Stock availability', 'No');
  await iStep(`User input Quantity:`, editProductPage, editProductPage.inputTextByLabel, 'Quantity', '10');
  await iStep(`User select option Default in Attribute group`, editProductPage, editProductPage.selectOptionOnAttributeGroup, 'Default');
  await iStep(`User select product attribute color`, editProductPage, editProductPage.selectAttribute, 'Color', 'Yellow');
  await iStep(`User select product attribute size`, editProductPage, editProductPage.selectAttribute, 'Size', 'XL');
  await iStep(`User select Save button`, editProductPage, editProductPage.clickButtonByLabel, 'Save');
  await iStep(`User should see notification: `, editProductPage, editProductPage.verifyNotification, 'Product saved successfully!');
});