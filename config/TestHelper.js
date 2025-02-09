import { chromium } from "@playwright/test";
import LoginPage from "../models/page_models/loginPage.model";

let instance = null;

const TestHelper = {
    async initialSetup() {
        if (!instance) {
            console.log("Launching Browser...");
            instance = {
                browser: await chromium.launch({ headless: false }),
            };
        }
        return instance;
    },

    async beforeEachTest() {
        const { browser } = await this.getInstance();
        const context = await browser.newContext();
        const page = await context.newPage();

        console.log("here");
        return { context, page };
    },

    async afterEachTest(context) {
        if (context) {
            //logout
            await context.close();
        }
    },

    async getInstance() {
        if (!instance) {
            throw new Error("Call initialSetup() first!");
        }
        return instance;
    },

    async cleanup() {
        if (instance) {
            console.log("Closing Browser...");
            await instance.browser.close();
            instance = null;
        }
    }
};

export default TestHelper;
