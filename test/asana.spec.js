import { test, expect } from '@playwright/test';
import testCases from '../test-data/testCases.json'; // Adjusted path to import the JSON file

testCases.forEach((testCase, index) => {
  test(`Asana Project Task Verification - Test Case ${index + 1}`, async ({ page }) => {
    try {
      // Navigate to the Asana login page
      await page.goto('https://app.asana.com/-/login');

      // Fill in the email address and click 'Continue'
      await page.getByLabel('Email address').fill('ben+pose@workwithloop.com');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();

      // Fill in the password and click 'Log in'
      await page.getByLabel('Password', { exact: true }).fill('Password123');
      await page.getByRole('button', { name: 'Log in' }).click();

      // Wait for the dashboard page to load
      await page.waitForNavigation();

      // Navigate to the specific project home page directly
      await page.goto('https://app.asana.com/0/home/1205366998147150');
      await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the page is fully loaded

      // Click on a specific project by its label
      await page.getByLabel(testCase.leftNav).click();

      // Click on a specific task within the project by its text
      await page.getByText(testCase.card_title).click();

      // Click on 'Non-Priority Remove' link by its role and name
      await page.getByRole('link', { name: testCase.tags[0] + ' Remove' }).click();
      await expect(page.getByRole('link', { name: testCase.tags[0] + ' Remove' })).not.toBeVisible();

      // Navigate back
      await page.goBack();

      // Click on 'On track Remove' link by its role and name
      await page.getByRole('link', { name: testCase.tags[1] + ' Remove' }).click();
      await expect(page.getByRole('link', { name: testCase.tags[1] + ' Remove' })).not.toBeVisible();

      console.log(`Test Case ${index + 1} passed`);

    } catch (error) {
      console.error(`Test Case ${index + 1} failed:`, error);
      throw error;
    }
  });
});
