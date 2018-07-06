'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const jsCwd = path.join(process.cwd(), './src');
const isDev = process.env.NODE_ENV !== 'production';
const bundleName = 'bundle.js';

module.exports = {
    context: jsCwd,
    cache: isDev,
    devtool: isDev ? 'cheap-inline-module-sourcemap' : 'hidden',
    entry: './index.js',
    mode: isDev ? 'development' : 'production',

    stats: {
        warnings: false,
        children: false
    },

    watchOptions: {
        aggregateTimeout: 100,
        poll: true
    },

    output: {
        path: path.join(process.cwd(), 'dest'),
        filename: bundleName,
        publicPath: '/dest/',
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            'app': path.join(jsCwd)
        }
    },

    module: {
        rules: [
            //Babel settings
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],

    devServer: {
        contentBase: __dirname,
        historyApiFallback: true,
        open: true,
        hot: true,
        compress: true,
        inline: true,
        stats: {
            warnings: false,
            modules: false,
            hash: false,
            children: false
        },
        watchOptions: {
            ignored: /node_modules/
        }
    }
};

if (isDev) {
    module.exports.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    module.exports.optimization = {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    beautify: false,
                    mangle: {
                        keep_fnames: true
                    },
                    compress: {
                        drop_console: false
                    },
                    comments: false
                }
            })
        ]
    };
}