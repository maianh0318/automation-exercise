// @ts-check
import { test } from '@playwright/test';
import { ContactUsPage, HomePage } from '../utils/index.js';

test('Test Case 6: Contact Us Form', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  // 9. Auto-accept the browser alert shown after submit
  page.on('dialog', (dialog) => dialog.accept());

  // 1. Launch browser, 2. Navigate to url, 3. Verify home page is visible
  await homePage.open();
  await homePage.verifyIsVisible();

  // 4. Click on 'Contact Us' button, 5. Verify 'GET IN TOUCH' is visible
  await contactUsPage.open();
  await contactUsPage.verifyGetInTouchVisible();

  // 6. Enter name, email, subject and message
  await contactUsPage.fillForm({
    name: 'Daisy',
    email: 'daisybong@yopmail.com',
    subject: 'Subject of Playwright practice',
    message: 'Content of Playwright practice...',
  });

  // 7. Upload file
  await contactUsPage.uploadFile('playwright.config.js');

  // 8. Click 'Submit' button, 9. Click OK button
  await contactUsPage.submit();

  // 10. Verify success message is visible
  await contactUsPage.verifySuccessMessage();

  // 11. Click 'Home' button and verify landed on home page
  await contactUsPage.clickHome();
  await homePage.verifyIsVisible();
});
