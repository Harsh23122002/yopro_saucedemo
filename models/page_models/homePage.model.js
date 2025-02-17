
import { test, expect } from '@playwright/test';
import CartPage from './cartPage.model';
class HomePage {
    static instance;
    constructor(page, user) {
        if (HomePage.instance) {
            throw new Error("Use HomePage.getInstance() instead of new.");
        }
        this.page = page;
        this.user = user;
        this.productList = '.inventory_item'; // Selector for all product items
        this.addToCartButtons = '.btn_inventory'; // "Add to Cart" button for products
        this.cartIcon = '.shopping_cart_link'; // Cart icon selector
        this.heading = page.locator(`//div[@class='product_label']`); //
        this.cartPage;
        HomePage.instance = this;
    }

    static getSingletonInstance() {
        if (!HomePage.instance) {
            throw new Error("Cannot be called before login! No Instance found, use new HomePage(page,user) to create a new instance");

        }
        return HomePage.instance;
    }

    static destroy() {
        HomePage.instance = null;
        CartPage.destroy()
    }

    async verifyHeading() {
        await expect(this.heading).toHaveText("Products");
    }

    async addProductToCart(productName) {
        const productSelector = `//div[@class='inventory_item_name' and text()='${productName}']/ancestor::div[@class='inventory_item']//button`;
        await this.page.locator(productSelector).click();
        this.user.cart.addProduct(productName);
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
        this.cartPage = new CartPage(this.page, this.user);
    }

    async verifyProductInCart(productName) {
        const productLocator = this.page.locator(`//div[@class='inventory_item_name' and text()='${productName}']`);
        await expect(productLocator).toBeVisible();
    }
}

export default HomePage;


