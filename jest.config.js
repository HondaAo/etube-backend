/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.export = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        '\\.jsx?$': 'babel-jest',
    },
    globals: {
        'ts-jest': {
          useBabelrc: true,
          tsConfigFile: './tsconfig.jest.json',
        },
    },
}