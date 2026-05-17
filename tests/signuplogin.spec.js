// @ts-check
import { expect, test } from '@playwright/test';
import { HomePage, SignupLoginPage, createUser } from '../utils/index.js';

test.describe('Automation Exercise - Signup / Login', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.verifyIsVisible();
  });

  test('Test Case 1: Register User', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);
    const user = createUser();
    await signupLoginPage.registerUser(user);
    await signupLoginPage.deleteAccount();
    await signupLoginPage.verifyAccountDeletedAndContinue();
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);
    const user = createUser();
    await signupLoginPage.registerUser(user);

    // Test Case 4: Logout User
    await signupLoginPage.logout();
    await signupLoginPage.login(user.email, user.password);
    await signupLoginPage.verifyLoggedInAs(user.firstName);
    await signupLoginPage.deleteAccount();
    await signupLoginPage.verifyAccountDeletedAndContinue();
  });

  test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    await page.pause();
    const signupLoginPage = new SignupLoginPage(page);
    const user = createUser();
    await signupLoginPage.registerUser(user);
    await signupLoginPage.logout();
    await signupLoginPage.login(user.email + "abc", user.password);
    await signupLoginPage.verifyErrorLoginFailed();
  });

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);
    let user = createUser();
    await signupLoginPage.registerUser(user);
    await signupLoginPage.logout();
    await signupLoginPage.fillSignupCredentials(user.fullName, user.email);
    await signupLoginPage.verifyEmailExist();

  });
});
