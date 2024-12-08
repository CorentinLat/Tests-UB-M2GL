export default {
    preset: 'jest-playwright-preset',
    testMatch: ['**/test/**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    verbose: true,
    testTimeout: 20000,
    setupFilesAfterEnv: ['expect-playwright'],
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium'],
            launchOptions: {
                headless: true,
            },
        },
    },
};
