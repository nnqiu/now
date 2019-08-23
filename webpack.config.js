// nodejs核心模块，用于操作文件路径
const path = require('path');
// webpack 并不会主动将你的css代码提取到一个文件，过去我们使用 extract-text-webpack-plugin，在webpack4中我们使用mini-css-extract-plugin来解决这个问题。
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// 清理项目每次构建多余文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 打包体积查看插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    /**  
     * mode：development production
     * 会将process.env.NODE_ENV设置成对应的值，然后启动对应的plugin
     * 注：只设置NODE_ENV是没有用的，必须使用mode
    */
    const devMode = argv.mode !== 'production'
    return {
        /** 
         * 入口出口文件也可以在package.json覆盖
        */
        /** 
         * 单入口 string|Array<string>
         * 多页面 {pageOne: './src/xx.js, pageTwo: './src/xx.jd'} 每次跳转页面生成新html文档
         * 使用"babel-polyfill"解决兼容性问题，加到entry数组中
         * */
        entry: [
            "babel-polyfill",
            path.join(__dirname, './src/index.js')
        ],
        /**
         *
         *
         * @param filename 输出的文件名
         * @param path 绝对路径 
         * @returns
        */
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
            new VueLoaderPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
                generateStatsFile: true, // 是否生成stats.json文件
            })
        ],
        /** 
         * 1.loader用于转换某些模块的代码
         * test：匹配哪些文件
         * use：使用什么loader
         * 须先npm install
         * 2.三个地方可以使用loader
         * a.webpack.config.js
         * b.代码中import 例：import Styles from 'style-loader!css-loader?modules!./styles.css';
         * 使用！隔开，都相对于当前目录解析
         * c.shell
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
                // sourcemap loader
                {
                    test: /\.vue$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                  }
            ]
        },
    }
    
}