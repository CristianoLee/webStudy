// 导入自定义的格式化时间的模块
const Time = require('./01.dateFormat')

// 调用方法，进行时间的格式化
const date = new Date()
// console.log(date);

const newDate = Time.dateFormat(date)
console.log(newDate);