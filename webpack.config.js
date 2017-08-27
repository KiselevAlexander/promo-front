const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client?http://localhost:3000',
        './source/js/index.js'
    ],

    output: {
        filename: 'script.bundle.js',
        path: path.join(__dirname, 'public/static/js'),
        publicPath: '/static/js'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    },
                    {
                        loader: 'babel-loader',
                        options: babelrc
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devtool: 'inline-source-map'
};
