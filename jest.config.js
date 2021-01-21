module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: '<rootDir>/test/setup.js',

  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: '<rootDir>/test/teardown.js',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/test/setupAfterEnv.js'],

  // The test environment that will be used for testing
  testEnvironment: '<rootDir>/test/environment.js',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/test/**/*.test.js']
};
