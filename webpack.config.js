require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ENV = require('./server/config/config').envName;
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

const plugins = [
    new CleanWebpackPlugin('client/dist/*.*', {
        exclude: [],
        verbose: true,
        dry: false,
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server', 'templates', 'login_template.pug'),
        chunks: ['login'],
        filetype: 'pug',
        filename: 'login.pug',
        favicon: path.resolve(__dirname, 'client', 'src', 'assets', 'favicon.png'),
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server', 'templates', 'app_template.pug'),
        chunks: ['app'],
        filetype: 'pug',
        filename: 'app.pug',
        favicon: path.resolve(__dirname, 'client', 'src', 'assets', 'favicon.png'),
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name].[contentHash].css",
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', ENV]),
];

module.exports = env => {
    const {
        watch,
    } = env;

    if (ENV !== PRODUCTION) {
        plugins.push(new ProgressBarPlugin());
    }

    return {
        mode: ENV || PRODUCTION,
        entry: {
            login: ['babel-polyfill', path.resolve(__dirname, 'client/src/login/entry.js')],
            app: ['babel-polyfill', path.resolve(__dirname, 'client/src/app/app.js')],
        },
        output: {
            path: path.resolve(__dirname, 'client/dist'),
            filename: '[name].[contentHash].js'
        },
        target: 'web',
        devtool: ENV === DEVELOPMENT ? 'inline-source-map' : false,
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.js|jsx/,
                    include: path.resolve(__dirname, 'client', 'src'),
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
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                },
            ],
        },
        watch: watch || ENV === DEVELOPMENT,
        plugins,
    };
};
