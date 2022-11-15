const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment

  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    '!pages/_app.tsx',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const getConfig = createJestConfig(customJestConfig);
module.exports = async () => {
  const nextJestConfig = await getConfig();
  // we need to transform esm files this way
  const esModules = ['axios'].join('|');
  // ignore pattern was not being passed. So, this is a workaround
  const transformIgnorePatterns = [
    `/node_modules/(?!${esModules})`,
    ...nextJestConfig.transformIgnorePatterns.filter(
      (pattern) => pattern !== '/node_modules/',
    ),
  ];
  return {
    ...nextJestConfig,
    transformIgnorePatterns,
  };
};
