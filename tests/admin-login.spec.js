const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');
const { loginSuccessfullyTestData, validateLoginFormTestData, loginFailedTestData } = require('../src/test-data/admin-login-test-data');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { beforeEach } = require('node:test');

let adminLoginPage;
let dashboard;

test.beforeEach('beforeEach', async ({ page }) => {
  adminLoginPage = new AdminLoginPage(page);
  dashboard = new DashboardPage(page);
})

loginSuccessfullyTestData.forEach(({ email, password }) => {
  test('Verify login successfully', async ({ page }) => {
    await iStep('User go to Admin Login page', adminLoginPage, adminLoginPage.open);
    await iStep('User should be on Admin Login page', adminLoginPage, adminLoginPage.isOnPage);
    await iStep(`User input Email: ${email}`, adminLoginPage, adminLoginPage.inputTextByLabel, 'Email', email);
    await iStep(`User input Password: ${password}`, adminLoginPage, adminLoginPage.inputTextByLabel, 'Password', password);
    await iStep('User click SIGN IN button', adminLoginPage, adminLoginPage.clickButtonByLabel, 'SIGN IN');
    await iStep(`User should be on Dashboard page`, dashboard, dashboard.isOnPage);
  });
});

loginFailedTestData.forEach(({ testCase, email, password, error }) => {
  test(`${testCase}`, async ({ page }) => {
    await iStep('User go to Admin Login page', adminLoginPage, adminLoginPage.open);
    await iStep('User should be on Admin Login page', adminLoginPage, adminLoginPage.isOnPage);
    await iStep(`User input Email: ${email}`, adminLoginPage, adminLoginPage.inputTextByLabel, 'Email', email);
    await iStep(`User input Password: ${password}`, adminLoginPage, adminLoginPage.inputTextByLabel, 'Password', password);
    await iStep('User click SIGN IN button', adminLoginPage, adminLoginPage.clickButtonByLabel, 'SIGN IN');
    await iStep(`User should login failed`, adminLoginPage, adminLoginPage.isLoginFailed);
  });
});

validateLoginFormTestData.forEach(({ testCase, inputEmail, errorEmail, inputPassword, errorPassword }) => {
  test(`${testCase}`, async ({ page }, testInfo) => {
    await iStep('User go to Admin Login page', adminLoginPage, adminLoginPage.open);
    await iStep('User should be on Admin Login page', adminLoginPage, adminLoginPage.isOnPage);
    await iStep(`User input Email: ${inputEmail}`, adminLoginPage, adminLoginPage.inputTextByLabel, 'Email', inputEmail);
    await iStep(`User input Password: ${inputPassword}`, adminLoginPage, adminLoginPage.inputTextByLabel, 'Password', inputPassword);
    await iStep('User click SIGN IN button', adminLoginPage, adminLoginPage.clickButtonByLabel, 'SIGN IN');
    await iStep('Error should be displayed for Email', adminLoginPage, adminLoginPage.verifyErrorLabel, 'Email', errorEmail);
    await iStep('Error should be displayed for Password', adminLoginPage, adminLoginPage.verifyErrorLabel, 'Password', errorPassword);
    expect(testInfo.errors).toEqual([]);
  });
});