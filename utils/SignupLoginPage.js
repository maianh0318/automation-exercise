const { expect } = require('@playwright/test');
const { randomUUID } = require('crypto');

/** Static defaults; name and email are set per test via createUser(). */
const USER_DEFAULTS = {
  password: 'Daisybong',
  title: 'Mr.',
  birthDay: '12',
  birthMonthIndex: 6,
  birthYear: '1998',
  company: 'Playwright test company',
  address1: 'Automation test street',
  address2: 'Automation test street 2',
  countryIndex: 2,
  state: 'State test',
  city: 'City test',
  zipcode: '123456',
  mobile: '+840003456',
};

function createUser(overrides = {}) {
  const uniqueId = randomUUID().replace(/-/g, '').slice(0, 12);
  const firstName = `User${uniqueId.slice(0, 6)}`;
  const lastName = `Test${uniqueId.slice(6, 10)}`;

  return {
    ...USER_DEFAULTS,
    name: firstName,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: `automation_${uniqueId}@yopmail.com`,
    ...overrides,
  };
}

class SignupLoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.signupForm = page.locator("div[class='signup-form']");
    this.accountForm = page.locator("div[class='login-form']");
  }

  // 4. Click on 'Signup / Login' button
  async openSignupLogin() {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }

  async fillSignupCredentials(name, email) {
    // 5. Verify 'New User Signup!' is visible
    await expect(this.signupForm).toBeVisible();

    // 6. Enter name and email address
    await this.signupForm
      .getByRole('textbox', { name: 'Name' })
      .pressSequentially(name, { delay: 50 });
    await this.signupForm
      .getByRole('textbox', { name: 'Email Address' })
      .pressSequentially(email, { delay: 50 });

    // 7. Click 'Signup' button
    await this.signupForm.getByRole('button', { name: 'Signup' }).click();
  }

  /**
   * @param {ReturnType<typeof createUser>} user
   */
  async fillAccountInformation(user) {
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(this.accountForm).toBeVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    await this.accountForm.getByRole('radio', { name: user.title }).click();

    const nameInput = this.accountForm.locator('#name');
    await nameInput.press('Control+A');
    await nameInput.pressSequentially(user.fullName, { delay: 50 });

    await this.accountForm
      .getByRole('textbox', { name: 'Password *' })
      .pressSequentially(user.password, { delay: 50 });
    await this.accountForm.locator("select[id='days']").selectOption({ value: user.birthDay });
    await this.accountForm
      .locator("select[id='months']")
      .selectOption({ index: user.birthMonthIndex });
    await this.accountForm
      .locator("select[id='years']")
      .selectOption({ label: user.birthYear });

    // 10. Select checkbox 'Sign up for our newsletter!'
    await this.accountForm.getByLabel('Sign up for our newsletter!').click();
    await expect(this.accountForm.getByLabel('Sign up for our newsletter!')).toBeChecked();

    // 11. Select checkbox 'Receive special offers from our partners!'
    await this.accountForm.getByText('Receive special offers from our partners!').click();
    await expect(
      this.accountForm.getByText('Receive special offers from our partners!'),
    ).toBeChecked();


    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await this.accountForm.getByRole('textbox', { name: 'First name' }).fill(user.firstName);
    await this.accountForm.getByRole('textbox', { name: 'Last name' }).fill(user.lastName);
    await this.accountForm.locator("input[id='company']").fill(user.company);
    await this.accountForm.locator("input[id='address1']").fill(user.address1);
    await this.accountForm.locator("input[id='address2']").fill(user.address2);
    await this.accountForm.locator("select[id='country']").selectOption({ index: user.countryIndex });
    await this.accountForm.getByRole('textbox', { name: 'State' }).fill(user.state);
    await this.accountForm.locator("input[id='city']").fill(user.city);
    await this.accountForm.locator("input[id='zipcode']").fill(user.zipcode);
    await this.accountForm.locator("input[id='mobile_number']").fill(user.mobile);
  }

  // 13. Click 'Create Account button'
  async createAccount() {
    await this.accountForm.getByRole('button', { name: 'Create Account' }).click();
  }

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  async verifyAccountCreated() {
    await expect(this.page.locator("h2[data-qa='account-created']")).toBeVisible();
  }

  // 15. Click 'Continue' button
  async continueAfterSignup() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  // 16. Verify that 'Logged in as username' is visible
  async verifyLoggedInAs(username) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  // 17. Click 'Delete Account' button
  async deleteAccount() {
    await this.page.getByText(' Delete Account').click();
  }

  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  async verifyAccountDeletedAndContinue() {
    await expect(this.page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  async logout() {
    await this.page.getByText(' Logout').click();
    await expect(this.accountForm).toBeVisible();
    await expect(this.signupForm).toBeVisible();
  }

  /**
   * @param {ReturnType<typeof createUser>} [user]
   */
  async registerUser(user = createUser()) {
    await this.openSignupLogin();
    await this.fillSignupCredentials(user.name, user.email);
    await this.fillAccountInformation(user);
    await this.createAccount();
    await this.verifyAccountCreated();
    await this.continueAfterSignup();
    await this.verifyLoggedInAs(user.firstName);
  }

  // 6. Enter correct email address and password to log in 
  async login(email, password) {
    await this.accountForm
    .getByRole('textbox', { name: 'Email Address' })
    .pressSequentially(email, { delay: 5 });

    await this.accountForm
    .getByRole('textbox', { name: 'Password' })
    .pressSequentially(password, { delay: 5 });

    await this.accountForm.getByRole('button', {name: 'Login'}).click();
  }

  // 8. Verify error 'Your email or password is incorrect!' is visible
  async verifyErrorLoginFailed() {
    await expect(this.page.getByText("Your email or password is incorrect!")).toBeVisible();
  }

  // 8. Verify error 'Your email or password is incorrect!' is visible
  async verifyEmailExist() {
    await expect(this.page.getByText("Email Address already exist!")).toBeVisible();
  }
}



module.exports = { SignupLoginPage, USER_DEFAULTS, createUser };
