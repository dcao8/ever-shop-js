const { test, expect } = require('@playwright/test');
const allure = require('allure-js-commons');
const { loginSuccessfullyTestData, validateLoginFormTestData, loginFailedTestData } = require('../test-data/admin-login-test-data');

const baseUrl = 'http://localhost:3000/admin/login';

loginSuccessfullyTestData.forEach(({ email, password }) => {
  test('Verify login successfully', async ({ page }) => {
    await gotoUrlStep(baseUrl, page);
    await allure.step(`User should be on Admin Login page`, async () => {
      await expect(page).toHaveTitle('Admin Login');
    });
    await inputTextByLabelStep('Email', email, page);
    await inputTextByLabelStep('Password', password, page);
    await clickButtonByLabelStep('SIGN IN', page);
    await allure.step(`User should be on Dashboard page`, async () => {
      let logoTextXpath = "//div[contains(concat(' ',@class,' '),' logo ') and .//text()[normalize-space()='EVERSHOP']]";
      await expect(page.locator(logoTextXpath)).toBeVisible();
    });
  });
});

validateLoginFormTestData.forEach(({ testCase, data }) => {
  test(`${testCase}`, async ({ page }, testInfo) => {
    await gotoUrlStep(baseUrl, page);
    await allure.step(`User should be on Admin Login page`, async () => {
      await expect(page).toHaveTitle('Admin Login');
    });
    for (let field in data) {
      if (data.hasOwnProperty(field)) {
        await inputTextByLabelStep(field, data[field].input, page);
      }
    }
    await clickButtonByLabelStep('SIGN IN', page);
    for (let field in data) {
      await allure.step(`'${data[field].error}' error should be displayed under ${field} field`, async () => {
        if (data.hasOwnProperty(field)) {
          let errorXpath = `(//label[./text()='${field}']/following::div[contains(concat(' ',@class,' '),' field-error ')])[1]`;
          await expect.soft(page.locator(errorXpath)).toHaveText(data[field].error);
        }
      });
    }
    expect(testInfo.errors).toEqual([]);
  });
});

loginFailedTestData.forEach(({ testCase, email, password, error }) => {
  test(`${testCase}`, async ({ page }) => {
    await gotoUrlStep(baseUrl, page);
    await allure.step(`User should be on Admin Login page`, async () => {
      await expect(page).toHaveTitle('Admin Login');
    });
    await inputTextByLabelStep('Email', email, page);
    await inputTextByLabelStep('Password', password, page);
    await clickButtonByLabelStep('SIGN IN', page);
    await allure.step(`User login failed`, async () => {
      let errorXpath = `//div[./text()[normalize-space()='${error}']]`;
      await expect(page.locator(errorXpath)).toBeVisible();
    });
  });
});

async function gotoUrlStep(url, page) {
  await allure.step(`User go to URL: ${url}`, async () => {
    await page.goto(url);
  });
}

async function inputTextByLabel(label, value, page) {
  let inputXpath = `(//label[./text()[normalize-space()='${label}']]/following::input)[1]`;
  await page.locator(inputXpath).fill(value);
}

async function inputTextByLabelStep(label, value, page) {
  await allure.step(`User input  ${label}:${value}`, async () => {
    await inputTextByLabel(label, value, page);
  });
}

async function clickButtonByLabelStep(label, page) {
  await allure.step(`User click ${label} button`, async () => {
    let loginXpath = `//button[.//text()[normalize-space()='${label}']]`;
    await page.locator(loginXpath).click();
  });
}