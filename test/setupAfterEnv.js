/* eslint-disable no-undef */
require('dotenv').config();

const databaseHelper = require('./database');

beforeAll(() => {
  return databaseHelper.connect();
});

beforeEach(() => {
  return databaseHelper.truncate();
});

afterAll(() => {
  return databaseHelper.disconnect();
});
