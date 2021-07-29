const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "email_mask.js",
        library: "email_mask",   // Important
        libraryTarget: 'umd',   // Important
        umdNamedDefine: true   // Important
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    /*optimization: {
        minimize: false
    }*/
}