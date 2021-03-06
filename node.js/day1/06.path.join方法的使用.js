const path = require('path')
const fs = require('fs')

// 注意： ../ 会抵消前面的路径  
const pathStr = path.join('/a', '/b/c', '../', './d', 'e')
console.log(pathStr); // 输出\a\b\d\e

fs.readFile(path.join(__dirname, '/files/1.txt'), 'utf-8', function (err, data) {
    if (err) {
        return console.log('读取失败！' + err.message);
    }
    console.log(data);
})