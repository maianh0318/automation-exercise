const { NAV_TABS, BASE_URL } = require('./constants');
const { HomePage } = require('./HomePage');
const { SignupLoginPage, USER_DEFAULTS, createUser } = require('./SignupLoginPage');

const LoginPage = SignupLoginPage;

const Utils = {
  NAV_TABS,
  BASE_URL,
  HomePage,
  SignupLoginPage,
  LoginPage,
  USER_DEFAULTS,
  createUser,
};

module.exports = {
  NAV_TABS,
  BASE_URL,
  HomePage,
  SignupLoginPage,
  LoginPage,
  USER_DEFAULTS,
  createUser,
  Utils,
};
