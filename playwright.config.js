// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        headless: false, // Set false for debugging
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    reporter: [['html', { open: 'never' }]], // Generates an HTML report
});
