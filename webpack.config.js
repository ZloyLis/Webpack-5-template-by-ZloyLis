const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//const CopyWebpackPlugin = require('copy-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
isProd = !isDev;

const filename = (ext) => isDev ? `[name]${ext}` : `[name]_[contenthash]${ext}`


const optimization = () => {
    const config = {
        minimize: isProd,
        splitChunks: {
            chunks: 'all'
        },
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", {interlaced: true}],
                            ["jpegtran", {progressive: true}],
                            ["optipng", {optimizationLevel: 5}],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [
                                                                {xmlns: "http://www.w3.org/2000/svg"},
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                }
            }),
        ]
    }
    return config
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',

    output: {
        clean: true,
        filename: `js/` + filename('.js'),
        path: path.resolve(__dirname, 'dist'),
        /*assetModuleFilename: `./assets/` + filename('[ext]'),*/
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            inject: 'body',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new MiniCssExtractPlugin({
            filename: './css/' + filename('.css')
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

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
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
                generator: {
                    filename: './assets/csv/' + `${filename}`
                }
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
                generator: {
                    filename: './assets/xml/' + `${filename}`
                }
            },
        ]
    },

    optimization: optimization()
}
