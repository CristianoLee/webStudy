// 这是包的入口文件

const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

// 导出需要的成员
module.exports = {
    // ... ES6语法：展开运算符，表示把数据结构展开
    ...date,
    ...escape
}