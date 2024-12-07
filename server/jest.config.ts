export default {
    clearMocks: true,
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'ts'],

    roots: ['<rootDir>/test'],

    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
