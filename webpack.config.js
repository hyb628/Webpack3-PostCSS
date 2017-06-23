var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

console.log('NODE_ENV',process.env.NODE_ENV);

const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');
const extractSASS = new ExtractTextPlugin('css/[name]-three.css');

var config = {
    entry: {
        main: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            'webpack/hot/dev-server',
            path.resolve(__dirname, 'src/main.js'),
            path.resolve(__dirname, 'src/index.js')
        ],
        verdor: [
            path.resolve(__dirname, 'src/verdor/verdor.js'),
        ]
     },
    // entry: path.resolve(__filename, '../src/main.js'),
    output: {
       path: path.resolve(__filename, '../dist'),
       publicPath: '/',
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

            // 使用postcss方式， css 插入到DOM形式 ， 支持热更新
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader',  'postcss-loader' ]
            // },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: ['style-loader'],
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    fallback: ['style-loader'],
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                })
            },
            // ExtractTextPlugin 提取了样式出来， 官方说No Hot Module Replacement。
            // https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/webpack-1/README.md
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: ['style-loader'],
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 生成html文件，里面的JS文件 src 地址自动添加hash
        new HtmlWebpackPlugin({
            title: 'huangyb',
            filename: 'index.html'
        }),
        // CSS生成单独的文件
        // new ExtractTextPlugin({
        //     filename: 'css/[name][hash:8].css',
        //     allChunks: true,
        //     disable: false
        // })

        extractCSS,
        extractLESS,
        extractSASS,

        // 用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        // * webpack3 NoEmitOnErrorsPlugin 已经 取代webpack 2 的 NoErrorsPlugin
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin(),  //终端显示

        new webpack.optimize.CommonsChunkPlugin({  // 提取公用JS代码插件
            names: ["vendor"],
            // ( 公共chunk(commnons chunk) 的名称)
            filename: "commons.js",
            // ( 公共chunk 的文件名)
            minChunks: 3,
            //(模块必须被3个 入口chunk 共享)
            // CommonsChunkPlugin 可以通过传参minChunks来控制你希望重复出现几次的module 被提取出来打包。
            // 也就是说你自己可以控制当一个模块被引入几次可以被打包到共用的chunk中，还可以规定如果这个公共模块小于一个值 minSize，
            // 就不被提取出来这些都可以帮助你控制你想要的粒度。当你改的不是公共模块的代码，理论上webpack 打包的时候本来就不会影响其他代码。
            // chunks: ["pageA", "pageB"],
            // (只使用这些 入口chunk)
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = config;
