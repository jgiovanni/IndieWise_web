// var webpack = require('webpack');

Elixir.webpack.mergeConfig({
    module: {
        preLoaders: [{
            test: /\.json$/,
            loader: 'json'
        }],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css!'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }],
        plugins: [
            // new webpack.DefinePlugin({
            //     'process.env': {
            //         NODE_ENV: '"production"'
            //     }
            // }),
            // // minify with dead-code elimination
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     }
            // }),
            // // Webpack 1 only - optimize module ids by occurrence count
            // new webpack.optimize.OccurrenceOrderPlugin()
        ]

    }
});