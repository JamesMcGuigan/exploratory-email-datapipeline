const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const { ifDevelopment, ifProduction } = getIfUtils(nodeEnv);

module.exports = removeEmpty({
    entry: _(fs.readdirSync('./src/'))
        .keyBy()
        .mapValues(file => `./src/${file}`)
        .value(),

    output: {
        // filename: ifProduction('[name].bundle-[hash].js', '[name].bundle.js'),
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].node.js',
        chunkFilename: '[name].node.js',
    },

    module: {
        rules: [
            // {
            //     test: /\.(sass|scss)$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader'],
            //     }),
            // },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader'],
            //     }),
            // },
            {
                test: /\.js/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/,
            },
        ],
    },

    //devtool: ifDevelopment('eval-source-map', 'source-map'),
    devtool: 'source-map',

    devServer: ifDevelopment({
        host: '0.0.0.0',
        port: 3000,
        stats: 'normal',
    }),

    plugins: removeEmpty([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
            },
        }),

        // new HtmlWebpackPlugin({
        //     hash: true,
        //     filename: 'index.html',
        //     template: './src/index.ejs',
        //     environment: nodeEnv,
        // }),

        // ifProduction(new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }])),

        // ifProduction(
        //     new ExtractTextPlugin('[name]-bundle-[hash].css'),
        //     new ExtractTextPlugin('[name]-bundle.css')
        // ),

        //// Doesn't work with node
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: function (module) {
        //         // this assumes your vendor imports exist in the node_modules directory
        //         return module.context && module.context.indexOf("node_modules") !== -1;
        //     }
        // })
    ]),

    node: {
        fs: "empty",
        net: "empty",
        child_process: "empty"
    }
});

if( require.main === module ) {
    console.info(module.exports);
}