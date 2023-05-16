/*
 * @Description: webpack base
 * @Author: yincece
 */
import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
const path = require("path");
import * as dotenv from "dotenv";
// 零依赖的模块，将环境变量中的变量从.env文件加载到process.env中
const envConfig = dotenv.config({
    path: path.resolve(__dirname, "../.env." + process.env.NODE_ENV),
});

const baseConfig: Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  // loader 配置
  module: {
    rules: [
        {
            test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
            use: "babel-loader"
        },
        {
            test: /.css$/, //匹配 css 文件
            use: ["style-loader", "css-loader"],
        },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
    alias: {
        "@": path.join(__dirname, '../src')
    },
  },
  // plugins 的配置
  plugins: [
    new HtmlWebpackPlugin({
        // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
        template: path.join(__dirname, "../public/index.html"),
        inject: true, // 自动注入静态资源
        hash: true,
        cache: false,
        // 压缩html资源
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true, //去空格
            removeComments: true, // 去注释
            minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
            minifyCSS: true, // 缩小CSS样式元素和样式属性
        }
    }),
    new DefinePlugin({
        "process.env": JSON.stringify(envConfig.parsed)
    })
  ]
};
export default baseConfig;
