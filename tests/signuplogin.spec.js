// @ts-check
import { test } from '@playwright/test';
import { HomePage, SignupLoginPage, createUser } from '../utils/index.js';

test.describe('Automation Exercise - Signup / Login', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.verifyIsVisible();
  });

  test('Test Case 1: Register User', async ({ page }) => {
    test.setTimeout(90_000);
    const signupLoginPage = new SignupLoginPage(page);
    const user = createUser();
    await signupLoginPage.registerUser(user);
    await signupLoginPage.deleteAccount();
    await signupLoginPage.verifyAccountDeletedAndContinue();
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    test.setTimeout(90_000);
    const signupLoginPage = new SignupLoginPage(page);
    const user = createUser();
    await signupLoginPage.registerUser(user);
    await signupLoginPage.logout();
    await signupLoginPage.login(user.email, user.password);
    await signupLoginPage.verifyLoggedInAs(user.firstName);
    await signupLoginPage.deleteAccount();
    await signupLoginPage.verifyAccountDeletedAndContinue();
  });
});
