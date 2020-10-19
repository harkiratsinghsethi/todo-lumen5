// const path = require('path');
// const autoprefixer = require('autoprefixer');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
// module.exports = {
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         chunkFilename: '[id].js',
//         publicPath: ''
//     },
//     resolve: {
//         extensions: ['.js', '.jsx']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.(less|css)$/,
//                 exclude: /node_modules/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     "css-loader",
//                     "less-loader"
//                 ]
//             },
//             {
//                 test: /\.(png|jpe?g|gif)$/,
//                 loader: 'url-loader?limit=10000&name=img/[name].[ext]'
//             },
//             {test: [/\.woff?$/, /\.woff2?$/, /\.ttf?$/, /\.eot?$/, /\.svg?$/], loader: 'url-loader'}]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: __dirname + '/src/index.html',
//             filename: 'index.html',
//             inject: 'body'
//         }),
//         new MiniCssExtractPlugin({
//             // Options similar to the same options in webpackOptions.output
//             // all options are optional
//             filename: '[name].css',
//             chunkFilename: '[id].css',
//             ignoreOrder: false, // Enable to remove warnings about conflicting order
//         })
//     ]
// };


const path = require("path");
const webpack = require('webpack');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=10000&name=img/[name].[ext]'
            },
            {test: [/\.woff?$/, /\.woff2?$/, /\.ttf?$/, /\.eot?$/, /\.svg?$/], loader: 'url-loader'}
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,

        host: 'localhost', // Defaults to `localhost`
        port: 8080, // Defaults to 8080
        proxy: {
            "/": "http://localhost:8080"
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ]
};
