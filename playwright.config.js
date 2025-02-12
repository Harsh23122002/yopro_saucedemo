// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'WebKit',
            use: { browserName: 'webkit' },
        }
    ],
    use: {
        headless: false, // Set false for debugging
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    reporter: [
        ['playwright-html', {
            testFolder: 'tests',
            title: 'Saucedemo Regression Report',
            project: 'Regression Testing Suite',
            release: '1.0.0',
            testEnvironment: 'Prod',
            embedAssets: true,
            embedAttachments: true,
            outputFolder: 'playwright-html-report',
            minifyAssets: true,
            startServer: true,
        }]
    ],
});
