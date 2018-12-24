const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ENV = require('./server/config/config').envName;

const plugins = [
    new CleanWebpackPlugin('client/dist/*.*', {
        exclude: [],
        verbose: true,
        dry: false
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/templates/login_template.pug'),
        chunks: ['vendors', 'login'],
        filetype: 'pug',
        filename: 'login.pug'
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/templates/app_template.pug'),
        chunks: ['vendors', 'app'],
        filetype: 'pug',
        filename: 'app.pug'
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name].css",
    })
];

module.exports = {
    mode: ENV,
    entry: {
        login: ['babel-polyfill', path.resolve(__dirname, 'client/src/login/entry.js')],
        app: ['babel-polyfill', path.resolve(__dirname, 'client/src/app/app.js')],
        vendors: ['react', 'react-dom', 'query-string']
    },
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins
};