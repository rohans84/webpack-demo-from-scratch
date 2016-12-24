const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries
    // Wel'll be using the latter form given it's
    // convenient with more complex configurations
    //
    // Entries have to resolve to files! It relies on Node.js
    // convention by default so if a directory contains 8index.js*,
    // it will resolve to that
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Webpack Demo'
        })
    ]
};

module.exports = function (env) {
    if (env === 'build') {
        return merge(
            common,
            {
                devtool: 'source-map'
            },
            parts.setupCSS(PATHS.app)
        );
    }
    return merge(
        common,
        {
            devtool: 'eval-source-map',
            // disable performance hints during development
            performance: {
                hints: false
            }
        },
        parts.setupCSS(PATHS.app),
        parts.devServer({
            host: process.env.HOST,
            port: Number(process.env.PORT)
        })
    )
}