// react_start/webpack.config.js
const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
              },
            {
              test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
            }
        ]
        },
    externals: {
        "isomorphic-fetch": "fetch"
      },
      
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    resolve: {
        extensions: ['.jsx', '.js'],
      },
      devServer: {
        port: 9070,
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new UglifyJsPlugin(),
        new NodePolyfillPlugin()
    ],
};