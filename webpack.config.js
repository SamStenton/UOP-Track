var webpack = require('webpack'),
    path = require('path');

module.exports = {
    cache: true,
    target: 'web',
    entry: {
        app: path.join(__dirname, 'resources/src/js/app.js')
    },
    output: {
        path: path.join(__dirname, 'resources/dist/js'),
        publicPath: '',
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
        jquery: 'jQuery',
        backbone: 'Backbone',
        underscore: '_'
    },
    plugins: [
        new webpack.ProvidePlugin({
            // Automatically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jquery: "jQuery",
            $: "jQuery",
            backbone: "Backbone",
            underscore: "_"
        })
    ]
};