// jest.config.js
const nextJest = require('next/jest');

// Use next/jest to create a Jest configuration for Next.js
const createJestConfig = nextJest({
  dir: './', // Path to your Next.js project
});

// Return the Jest configuration
module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup file for jest-dom
  moduleDirectories: ['node_modules', 'src'], // Optional: enables importing from 'src' directory
});
