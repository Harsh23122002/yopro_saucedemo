import { test, expect } from '@playwright/test';
import { CheckoutPage } from './checkoutPage.model';

class CartPage {
    static instance;
    constructor(page, user) {
        if (CartPage.instance) {
            throw new Error("Use CartPage.getInstance() instead of new.");
        }
        this.page = page;
        this.user = user;
        this.cartHeading = this.page.locator(".subheader");
        this.checkoutButton = this.page.locator(`//a[text()='CHECKOUT']`);
        this.continueButton = this.page.locator(`//input[@value='CONTINUE']`);
        this.firstNameField = '#first-name';
        this.lastNameField = '#last-name';
        this.postalCodeField = '#postal-code';
        CartPage.instance = this;
    }

    static getSingletonInstance() {
        if (!CartPage.instance) {
            throw new Error("Single instance needs to be created, use new CartPage(page,user) to create a new instance");

        }
        return CartPage.instance;
    }

    static destroy() {
        CartPage.instance = null;
        CheckoutPage.destroy();
    }

    async verifyCartHeading() {
        await expect(this.cartHeading).toHaveText("Your Cart");
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async verifyCartItems() { }

    async fillInformation() {
        await this.page.fill(this.firstNameField, "firstName");
        await this.page.fill(this.lastNameField, "lastName");
        await this.page.fill(this.postalCodeField, "111-111");
        await this.continueButton.click()
        new CheckoutPage(this.page, this.user);
    }
}
export default CartPage;