const webpack = require('webpack');
exports.devServer = function(options) {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            host: options.host,
            port: options.port,
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
            // Disabled as this won't work with html-webpack-template yet
            //multiStep: true
            })            
        ]
    }
}

exports.setupCSS = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    include: paths
                }
            ]
        }
    };
}