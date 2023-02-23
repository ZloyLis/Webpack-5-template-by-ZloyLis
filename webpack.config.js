const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
isProd = !isDev;

const filename = (ext) => isDev ? `[name]${ext}` : `[name]_[contenthash]${ext}`

console.log('isDev: ', isDev)



module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: `js/` + filename('.js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            inject: 'body',
            minify: {
                collapseWhitespace: isProd,
            },
        })
    ],

    module:  {
        rules:[
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
        ]
    }
}