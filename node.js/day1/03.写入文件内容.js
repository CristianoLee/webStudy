// 1.导入fs文件系统模块
const fs = require('fs')
// 2，调用fs,weiteFile()方法，写入文件的内容
//  参数1：读取文件的存放路径
//  参数2：表示要写入的内容
//  参数3：回调函数
fs.writeFile('./files/2.txt', 'abcd', function (err) {
    // 如果文件写入成功，则 err 的值等于 null
    // 如果失败则 err 的值为错误对象
    // console.log(err);

    if (err) {
        return console.log('文件写入失败' + err.message);
    }
    console.log('文件写入成功！');
})