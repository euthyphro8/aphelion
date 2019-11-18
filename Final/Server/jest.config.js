module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: null,
    testRegex: '/test/.*\\.spec\\.ts$',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageReporters:   ['lcovonly', 'text'],
    globals:             {
        'ts-jest': {
            babelConfig: {
                presets: [
                    [
                        'babel-preset-trigen',
                        {
                            commonjs: true
                        }
                    ]
                ]
            }
        }
    }
};
