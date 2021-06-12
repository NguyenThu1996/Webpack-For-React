const path = require("path");

// include the js minification plugin
const TerserJSPlugin = require('terser-webpack-plugin');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: [
        "./src/App.js",
        "./src/App.css",
    ],
    target: 'es5',
    output: {
        filename: "app.min.js",
        path: path.resolve(__dirname, "assets", "dist"),
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env",
                        "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images/',
                            name: "[name].[ext]"
                        }
                    }
                ]
            },

            {
                test: /\.(eot|woff|woff2|otf|ttf|ttc)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts/',
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // extract css into dedicated file
        new MiniCssExtractPlugin({
            filename: "app.min.css"
        })
    ],
    optimization: {
        minimizer: [
            // enable the js minification plugin
            new TerserJSPlugin({
                parallel: true
            }),
            // enable the css minification plugin
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};