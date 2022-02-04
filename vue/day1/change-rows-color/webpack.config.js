const path = require('path')
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
    }
}