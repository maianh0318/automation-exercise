// @ts-check
import { test, expect } from '@playwright/test';

const NAV_TABS = [
  'Home',
  'Products',
  'Cart',
  'Signup / Login',
  'Test Cases',
  'API Testing',
  'Video Tutorials',
  'Contact us',
];

test.describe('Automation Exercise - Signup / Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.pause();
    // 1. Launch browser and 2. Navigate to URL
    await page.goto('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    await expect(page.getByRole('img', { name: 'Website for automation practice' })).toBeVisible();
    const rightNavBar = page.locator('ul.nav.navbar-nav');
    await expect(rightNavBar.getByRole('listitem')).toHaveCount(8);

    for (const tabName of NAV_TABS) {
      await expect(rightNavBar.getByRole('link', { name: tabName })).toBeVisible();
    }
  });

  test('Test Case 1: Register User', async ({ page }) => {
    // 4. Click on 'Signup / Login' button
    await page.getByRole("link", {name: ' Signup / Login'}).click();

    const signupForm = page.locator("div[class='signup-form']");
    // 5. Verify 'New User Signup!' is visible
    await expect(signupForm).toBeVisible();

    // 6. Enter name and email address
    await signupForm.getByRole('textbox', {name: 'Name'})
    .pressSequentially('Daisy', {delay: 50});
    await signupForm.getByRole('textbox', {name: 'Email Address'})
    .pressSequentially('daisybong@yopmail.com', {delay: 50});

    // 7. Click 'Signup' button
    await signupForm.getByRole('button', {name: 'Signup'}).click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    const loginForm = page.locator("div[class='login-form']");
    await expect(loginForm).toBeVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    await loginForm.getByRole('radio', {name: 'Mr.'}).click();
    await loginForm.locator("(//input[@id='name'])").press('Control+A');
    await loginForm.locator("(//input[@id='name'])").pressSequentially('Daisy Bong', {delay: 50});
    await loginForm.getByRole('textbox', {name: 'Password *'}).pressSequentially('Daisybong', {delay: 50});
    await loginForm.locator("select[id='days']").selectOption({value: '12'});
    await loginForm.locator("select[id='months']").selectOption({index: 6});
    await loginForm.locator("select[id='years']").selectOption({label: '1998'});

    // 10. Select checkbox 'Sign up for our newsletter!'
    await loginForm.getByLabel('Sign up for our newsletter!').click();
    await expect(loginForm.getByLabel('Sign up for our newsletter!')).toBeChecked();

    // 11. Select checkbox 'Receive special offers from our partners!'
    await loginForm.getByText('Receive special offers from our partners!').click();
    await expect(loginForm.getByText('Receive special offers from our partners!')).toBeChecked();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await loginForm.getByRole('textbox', {name: 'First name'}).fill('Daisy');
    await loginForm.getByRole('textbox', {name: 'Last name'}).fill('Bong');
    await loginForm.locator("input[id='company']").fill('Playwright test company');
    await loginForm.locator("input[id='address1']").fill('Automation test street');
    await loginForm.locator("input[id='address2']").fill('Automation test street 2');
    await loginForm.locator("select[id='country']").selectOption({index: 2});
    await loginForm.getByRole('textbox', {name: 'State'}).fill('State test');
    await loginForm.locator("input[id='city']").fill('City test');
    await loginForm.locator("input[id='zipcode']").fill('123456');
    await loginForm.locator("input[id='mobile_number']").fill('+840003456');

    // 13. Click 'Create Account button'
    await loginForm.getByRole('button', {name: 'Create Account'}).click();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.locator("h2[data-qa='account-created']")).toBeVisible();

    // 15. Click 'Continue' button
    await page.getByRole('link', {name: 'Continue'}).click();

    // 16. Verify that 'Logged in as username' is visible
    await expect(page.getByText('Logged in as Daisy')).toBeVisible();

    // 17. Click 'Delete Account' button
    await page.getByText(' Delete Account').click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', {name: 'Continue'}).click();
  });

});
