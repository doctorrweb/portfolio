module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/joi-browser/, /node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                //test: /\.(css|less)$/,
                //test: /\.css$/,
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'primary-color': '#009944',
                                'link-color': '#009944',
                                'border-radius-base': '2px'
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css']
    },
    devServer: {
        historyApiFallback: true
    }
}