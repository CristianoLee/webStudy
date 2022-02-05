const fs = require('fs')

// 出现路径拼接错误的问题，是因为提供了./或../开头的相对路径
// 如果要解决这问题，可以直接提供一个完整的文件存放路径
// fs.readFile('./files/1.txt', 'utf-8', function (err, data) {
//     if (err) {
//         return console.log('读取失败' + err.message);
//     }
//     console.log('读取文件成功！' + data);
// })

// 移植性非常差，不利于维护
// fs.readFile('D:\\study\\webStudy\\node.js\\day1\\files\\1.txt', 'utf-8', function (err, data) {
//     if (err) {
//         return console.log('读取失败' + err.message);
//     }
//     console.log('读取文件成功！' + data);
// })

// __dirname表示当前文件所处的目录
fs.readFile(__dirname + '/files/1.txt', 'utf-8', function (err, data) {
    if (err) {
        return console.log('读取失败' + err.message);
    }
    console.log('读取文件成功！' + data);
})

