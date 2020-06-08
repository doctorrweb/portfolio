const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const darkThemeVars = require('antd/dist/dark-theme')

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'main.[contenthash].js',
        publicPath: '/dist/'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            { 
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader'
                },
            },
            { 
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ],
            },
            {
                test: /\.less$/,
                include: [/node_modules\/.*antd/],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                ...darkThemeVars,
                                'primary-color': '#FF9900',
                                'link-color': '#FF9900',
                                'border-radius-base': '2px',
                                'font-family': 'Helvetica Neue',
                                'code-family': 'Menlo',
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            favicon: './public/img/favicon.ico',
            template: './template.html',
            cache: true
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
    },
    stats: {
        colors: true,
    },
    devtool: 'source-map',
}