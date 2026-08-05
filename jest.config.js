// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createDefaultPreset } = require('ts-jest');

createDefaultPreset();

/** @type {import("jest").Config} **/
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/app.controller.ts',
    '/src/app.module.ts',
    '/src/main.ts',
    '.*\\.module\\.ts$',
    '.*\\.mock\\.ts$',
    '.*\\.dto\\.ts$',
    '.*\\.d\\.ts$',
    'index.ts',
  ],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
