// 1.导入fs模块
const fs = require('fs')

// 2.调用fs.readFile()方法读取文件
// 参数1：读取文件的存放路径
// 参数2：读取文件时候采用的编码格式，一般默认指定 utf8
fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
    // 打印失败的结果，如果读取成功，则 err 的值为 null
    // 如果失败则 err 的值为错误对象，dataStr的值为 undefined
    console.log(err);
    console.log('------------');
    // 打印成功的结果
    console.log(dataStr);
})