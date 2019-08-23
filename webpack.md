npm i webpack --save-dev
npm i webpack-cli --save-dev
npm i babel-core babel-loader babel-preset-env --save-dev
npm i babel-core babel-loader babel-preset-env --save-dev
npm i mini-css-extract-plugin css-loader --save-dev
npm i style-loader postcss-loader  --save-dev
npm i html-webpack-plugin html-loader --save-dev

npm i react react-dom --save
npm i babel-preset-react --save-dev
npm i less less-loader --save-dev

npm i vue --save
npm i vue-loader vue-template-compiler --save-dev
npm i node-sass sass-loader --save-dev

// 打包清理源目录文件
npm install clean-webpack-plugin --save-dev

npm install file-loader --save-dev
npm i webpack-dev-server --save-dev

模块解析(module resolution)

resolve是一个库
```
import foo from 'path/to/module'
// 或者
require('path/to/module')
```

manifest

npm start时候报错，Module build failed (from ./node_modules/babel-loader/lib/index.js)......,删除了.babelrc文件解决
babel-preset-es2015: 可以将es6的代码编译成es5.
babel-preset-es2016: 可以将es7的代码编译为es6.
babel-preset-es2017: 可以将es8的代码编译为es7.

webpack-bundle-analyzer
```
npm install --save-dev webpack-bundle-analyzer
```
