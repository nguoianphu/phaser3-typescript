var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = env => ({
    entry: './src/games/flappy-bird/game.ts',
    output: {
        path: path.resolve(__dirname, 'deploy/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        publicPath: '/deploy/',
        compress: true,
        port: 8080,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser: phaser
        }
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new JavaScriptObfuscator(
            {
                rotateUnicodeArray: true
            },
            []
        )
    ],
 
});