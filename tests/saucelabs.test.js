import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');
import LoginPage from '../models/page_models/loginPage.model';
import HomePage from '../models/page_models/homePage.model';
import CartPage from '../models/page_models/cartPage.model';
import { setTimeout } from "timers/promises";
import { CheckoutPage } from '../models/page_models/checkoutPage.model';


test.afterEach(async () => {
    // await context.close();
    LoginPage.destroy();
});


test('Verify Product to cart', async ({ page }) => {
    page.goto('https://www.saucedemo.com/v1');
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const homePage = HomePage.getSingletonInstance();
    await homePage.verifyHeading();
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.goToCart();
    const cartPage = CartPage.getSingletonInstance();
    await cartPage.verifyCartHeading();
    await cartPage.clickCheckout();
    await cartPage.fillInformation();
    const checkoutPage = CheckoutPage.getSingletonInstance();
    await checkoutPage.verifyTotalAmount(32.39);
    await checkoutPage.verifyTax(2.40);
});

test('Verify Product to cart: tc2', async ({ page }) => {
    page.goto('https://www.saucedemo.com/v1');
    const loginPage = new LoginPage(page);
    await loginPage.login('problem_user', 'secret_sauce');
    const homePage = HomePage.getSingletonInstance();
    await homePage.verifyHeading();
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.goToCart();
    const cartPage = CartPage.getSingletonInstance();
    await cartPage.verifyCartHeading();
    await cartPage.clickCheckout();
    await cartPage.fillInformation();
    const checkoutPage = CheckoutPage.getSingletonInstance();
    await checkoutPage.verifyTotalAmount(32.39);
    await checkoutPage.verifyTax(2.40);
});

test('Verify multiple Product to cart', async ({ page }) => {
    page.goto('https://www.saucedemo.com/v1');
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const homePage = HomePage.getSingletonInstance();
    await homePage.verifyHeading();
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await homePage.addProductToCart('Sauce Labs Bike Light');
    await homePage.goToCart();
    const cartPage = CartPage.getSingletonInstance();
    await cartPage.verifyCartHeading();
    await cartPage.clickCheckout();
    await cartPage.fillInformation();
    const checkoutPage = CheckoutPage.getSingletonInstance();
    await checkoutPage.verifyTotalAmount(60.45);
    await checkoutPage.verifyTax(4.48);
});

test('Verifylogin', async ({ page }) => {
    page.goto('https://www.saucedemo.com/v1');
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');
    const homePage = HomePage.getSingletonInstance();
    await homePage.verifyHeading();

});