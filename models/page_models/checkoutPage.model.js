import { expect } from "@playwright/test";

export class CheckoutPage {
    static instance;
    constructor(page, user) {
        if (CheckoutPage.instance) {
            throw new Error("Use CheckoutPage.getInstance() instead of new.");
        }
        this.page = page;
        this.firstNameInput = this.page.locator("#first-name");
        this.lastNameInput = this.page.locator("#last-name");
        this.zipCodeInput = this.page.locator("#postal-code");
        this.continueButton = this.page.locator("#continue");
        this.taxAmount = this.page.locator(".summary_tax_label");
        this.totalAmount = this.page.locator(".summary_total_label");
        CheckoutPage.instance = this;
    }
    static getSingletonInstance() {
        if (!CheckoutPage.instance) {
            throw new Error("Single instance needs to be created, use new CartPage(page,user) to create a new instance");

        }
        return CheckoutPage.instance;
    }

    static destroy() {
        CheckoutPage.instance = null;
    }
    async fillCheckoutDetails(firstName, lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    async verifyTax(expectedTax) {
        const taxText = await this.taxAmount.textContent();
        const taxValue = parseFloat(taxText.replace("Tax: $", ""));
        expect(taxValue).toBeCloseTo(expectedTax, 2);
    }

    async verifyTotalAmount(expectedTotal) {
        const totalText = await this.totalAmount.textContent();
        const totalValue = parseFloat(totalText.replace("Total: $", ""));
        expect(totalValue).toBeCloseTo(expectedTotal, 2);
    }
}
