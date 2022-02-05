const path = require('path')

// 1.导入html-webpack-plugin这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')

// 2.new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定要复制哪个页面
    template: './src/index.html',
    // 指定复制出来的文件名和存放路径
    filename: './index.html'
})

// 使用node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
    // 代表 webpack 运行的模式，可选值有两个 development 和 production
    // 结论：开发时候一定要用development因为追求的是打包速度而不是体积
    // 发布上线时一定要用production,因为上线追求的是体积小，而不是打包速度快！
    mode: 'development',
    // entry:'指定要处理哪个文件'
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成的文件要存放到哪里
    output: {
        // 存放目录
        path: path.join(__dirname, 'dist'),
        // 生成的文件名
        filename: 'bundle.js'
    },
    // 插件的数组，将来webpack在运行时，会加载并调用这些插件
    plugins: [htmlPlugin],
    devServer: {
        // 首次打包成功后，自动打开浏览器进入默认网页
        open: true,
        // 在http协议中，如果端口号是80，则可以被省略
        port: 80,
        // 指定运行的主机地址
        host: '127.0.0.1'
    }
}