const path = require('path');


const isDev = process.env.NODE_ENV === 'development';
isProd = !isDev;

const filename = (ext) => isDev ? `[name]${ext}` : `[query][contenthash]${ext}`

console.log('isDev: ', isDev)

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: filename('.js'),
        path: path.resolve(__dirname, 'dist')
    }
}