import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');
import LoginPage from '../models/page_models/loginPage.model';
import HomePage from '../models/page_models/homePage.model';
import { setTimeout } from "timers/promises";

let browser, context, pagee;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false }); // Change to true for CI
    context = await browser.newContext(); // Creates a fresh browser context for isolation
    pagee = await context.newPage();
});

test.afterAll(async () => {
    await browser.close();
});

test.beforeEach(async () => {
    // context = await browser.newContext(); // Creates a fresh browser context for isolation
    // const pagee = await context.newPage();
    await pagee.goto('https://www.saucedemo.com/v1');
    new LoginPage(pagee);
});

test.afterEach(async () => {
    // await context.close();
    LoginPage.destroy();
});


test('Verify Product to cart', async ({ page }) => {
    const loginPage = LoginPage.getSingletonsInstance();
    await loginPage.login('standard_user', 'secret_sauce');
    const homePage = HomePage.getSingletonsInstance();
    await homePage.verifyHeading();
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.goToCart();
    await setTimeout(5000);

});

test('Verify Product t2o cart', async ({ page }) => {
    const loginPage = LoginPage.getSingletonsInstance();
    await loginPage.login('standard_user', 'secret_sauce');

});

