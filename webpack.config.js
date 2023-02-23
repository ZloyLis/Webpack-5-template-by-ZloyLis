const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
isProd = !isDev;

const filename = (ext) => isDev ? `[name]${ext}` : `[contenthash]${ext}`

console.log('isDev: ', isDev)

module.exports = {
    entry: './src/index.js',
    output: {
        filename: filename('.js'),
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '.src/index.html'),
            minify: {
                collapseWhitespace: isProd,
            }
        }),
    ]
}