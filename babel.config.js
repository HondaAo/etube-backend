module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                'modules': 'false',
                'useBuiltIns': 'usage',
                'targets': '> 0.25%, not dead',
            }
        ]
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy" : true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    ],
    env: {
        test: {
            presets: [
                ['@babel/preset-env', {targets: {node: 'current'}}],
                '@babel/preset-typescript',
            ],
        },
    },
};