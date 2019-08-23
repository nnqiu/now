// nodejs核心模块，用于操作文件路径
const path = require('path');
// webpack 并不会主动将你的css代码提取到一个文件，过去我们使用 extract-text-webpack-plugin，在webpack4中我们使用mini-css-extract-plugin来解决这个问题。
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// 清理项目每次构建多余文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        /** 
         * 入口出口文件也可以在package.json覆盖
        */
        // 入口文件
        entry: [
            "babel-polyfill",
            path.join(__dirname, './src/index.js')
        ],
        // 出口文件
        output:{
            path: path.resolve(__dirname, 'dist'),
            filename:"main.js"
        },
        /** 
         * plugins插件则可以用于执行范围更广的任务
         * 先require，然后new
        */
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
              filename: "[name].css",
              chunkFilename: "[id].css"
            }),
            // new CleanWebpackPlugin(['dist']),
            new VueLoaderPlugin()
        ],
        /** 
         * loader用于转换某些模块的代码
         * test：匹配哪些文件
         * use：使用什么loader
        */
        module: {
            rules: [
                // 转换es6代码
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                // 编译css
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                // 静态资源处理
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {}
                      }
                    ]
                },
                // 解析vue
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {}
                    }
                },
            ]
        },
    }
    
}