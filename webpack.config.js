require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ENV = require('./server/config/config').envName;
const PRODUCTION = 'production';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            CLOUD_NAME: JSON.stringify(process.env.CLOUD_NAME),
            UPLOAD_PRESET: JSON.stringify(process.env.UPLOAD_PRESET),
        },
    }),
    new CleanWebpackPlugin('client/dist/*.*', {
        exclude: [],
        verbose: true,
        dry: false,
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/templates/login_template.pug'),
        chunks: ['login'],
        filetype: 'pug',
        filename: 'login.pug',
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/templates/app_template.pug'),
        chunks: ['app'],
        filetype: 'pug',
        filename: 'app.pug',
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name].[contentHash].css",
    }),
];

module.exports = env => {
    const {
        NODE_ENV,
        watch,
    } = env;

    return {
        mode: NODE_ENV || PRODUCTION,
        entry: {
            login: ['babel-polyfill', path.resolve(__dirname, 'client/src/login/entry.js')],
            app: ['babel-polyfill', path.resolve(__dirname, 'client/src/app/app.js')],
        },
        output: {
            path: path.resolve(__dirname, 'client/dist'),
            filename: '[name].[contentHash].js'
        },
        target: 'web',
        devtool: NODE_ENV === PRODUCTION ? undefined : 'source-map',
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
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
                            loader: MiniCssExtractPlugin.loader,
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
                },
            ],
        },
        plugins,
        watch,
    };
};
