const allure = require('allure-js-commons');

export async function iStep(stepName, page, action, ...args) {
    await allure.step(stepName, async () => {
        await action.apply(page, args);
    });
}