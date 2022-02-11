module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./test-setup.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
};
