const preset = require('jest-preset-angular/presets');

module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text', 'text-summary'],
  coverageDirectory: 'coverage/frontend',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@angular|@ngrx|rxjs)'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};
