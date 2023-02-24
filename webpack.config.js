const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');


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
        /*assetModuleFilename: `./assets/` + filename('[ext]'),*/
        clean: true,
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            inject: 'body',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        //new CopyWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        historyApiFallback: true,
        liveReload: true,
        compress: true,
        port: 9000,
        hot: true
    },
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000
    },

    module:  {
        rules:[
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './assets/images/[name][ext]'
                }
            },
            {
                test: /\.(ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './assets/icons/[name][ext]'
                }
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: './assets/svg/[name][ext]'
                }

            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },

        ]
    }
}