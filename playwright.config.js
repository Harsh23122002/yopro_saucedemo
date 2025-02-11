import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  use: {
    headless: false, // Set false for debugging (use true for CI)
    screenshot: 'only-on-failure', // Take screenshots only on failure
    video: 'retain-on-failure', // Keep video files only on failure
    trace: 'on-first-retry', // Record traces on first retry attempt
  },
 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    },
  ],
  reporter: [
    ['@cucumber/cucumber', { 
      output: './reports/cucumber_report.html', // Output Cucumber JSON report
    }],
  ],
});
