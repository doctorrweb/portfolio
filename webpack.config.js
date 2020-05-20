const darkThemeVars = require('antd/dist/dark-theme')

module.exports = {
    devServer: {
        historyApiFallback: true,
    },
    entry: './client/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/joi-browser/, /node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                //test: /\.(css|less)$/,
                //test: /\.css$/,
                test: /\.less$/,
                include: [/node_modules\/.*antd/],
                use: [
                    { loader: 'style-loader' },
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
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
    },
    stats: {
        colors: true,
    },
    devtool: 'source-map',
}