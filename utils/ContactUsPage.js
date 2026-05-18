const { expect } = require('@playwright/test');

class ContactUsPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  // 4. Click on 'Contact Us' button
  async open() {
    await this.page.getByRole('link', { name: 'Contact us' }).click();
    await this.page.waitForURL('**/contact_us');
    await expect(this.page.getByText('Get In Touch')).toBeVisible();
  }

  // 5. Verify 'GET IN TOUCH' is visible
  async verifyGetInTouchVisible() {
    await expect(this.page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  }

  // 6. Enter name, email, subject and message
  async fillForm({ name, email, subject, message }) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Email', { exact: true }).fill(email);
    await this.page.getByPlaceholder('Subject').fill(subject);
    await this.page.getByPlaceholder('Your Message Here').fill(message);
  }

  // 7. Upload file
  async uploadFile(filePath) {
    await this.page.locator('input[name="upload_file"]').setInputFiles(filePath);
  }

  // 8. Click 'Submit' button (register dialog handler before calling this method)
  async submit() {
    await this.page.locator('[data-qa="submit-button"]').click();
  }

  // 10. Verify success message is visible
  async verifySuccessMessage() {
    await expect(this.page.locator('.contact-form .status')).toContainText(
      'Success! Your details have been submitted successfully.',
    );
  }

  // 11. Click 'Home' button (contact form section, not main nav)
  async clickHome() {
    await this.page.locator('#form-section').getByRole('link', { name: 'Home' }).click();
  }
}

module.exports = { ContactUsPage };
