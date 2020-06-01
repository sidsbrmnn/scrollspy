const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scrollspy.min.js',
        library: 'scrollSpy',
        libraryTarget: 'umd',
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
