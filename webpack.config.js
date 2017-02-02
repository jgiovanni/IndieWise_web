Elixir.webpack.mergeConfig({
    module: {
        preLoaders: [{
            test: /\.json$/,
            loader: 'json'
        }],
        loaders:[{
            test: /\.css$/,
            loader:'style!css!'
        }]
    }
});