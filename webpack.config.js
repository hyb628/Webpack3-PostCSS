var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var autoprefixer = require('autoprefixer');

console.log('NODE_ENV',process.env.NODE_ENV);

var config = {
    entry: [
        // 多个入口文件 数组形式
        // 'webpack-hot-middleware/', 
         path.resolve(__dirname, 'src/main.js'),
         path.resolve(__dirname, 'src/index.js')
    ],
    // entry: path.resolve(__filename, '../src/main.js'),
    output: {
       path: path.resolve(__filename, '../dist'),
       filename: '[name].[hash:8].bundle.js',
        // webpack 允许你根据文件内容生成哈希值，只要用 [chunkhash] 替换 [hash] 就可以了
        // 不要在开发环境下使用 [chunkhash]，因为这会增加编译时间。将开发和生产模式的配置分开，并在开发模式中使用 [name].js 的文件名， 在生产模式中使用 [name].[chunkhash].js 文件名。
        //    publicPath: '/',
        //    chunkFilename: '[id].[chunkhash].js'
    },
    // 生成.map文件
    // devtool: 'source-map', 
    module: {
        rules: [
            // 加载JSON文件 使用json-loader
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            // 处理 .json5结尾的文件
            {
                test: /\.json5$/,
                use: 'json5-loader'
            }, 
            // {
            //     test: /\.css$/,
            //     // 使用①生成的css文件 插入到html中
            //     // use: [ 'style-loader', 'css-loader' ]
            //     // 使用②ExtractTextPlugin 生成style.css文件
            //     // 在主入口文件中import
            //     use: ExtractCSS.extract([
            //         'css-loader',
            //         // 'px2rem2-loader',
            //         'postcss-loader',
            //     ]),
            // }
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: ['style-loader'],
                    use: ['css-loader?-autoprefixer&sourceMap=true&importLoaders=1', 'postcss-loader']
                })
            }

            // 使用postcss方式， css 插入到DOM形式
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'postcss-loader' ]
            // }
        ]
    },
    plugins: [
        // 生成html文件，里面的JS文件 src 地址自动添加hash
        new HtmlWebpackPlugin({
            title: 'huangyb',
            filename: 'index.html'
        }),
        // CSS生成单独的文件
        new ExtractTextPlugin({
            filename: 'css/[name][hash:8].css',
            allChunks: true,
            disable: false
        })
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
    ]
}

module.exports = config;
