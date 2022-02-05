const fs = require('fs')
fs.readFile('./files/成绩.txt', 'utf-8', function (err, data) {
    if (err) {
        return console.log('读取文件失败！' + err.message);
    }
    let oldData = data.split(' ');
    // console.log(oldData);
    let newData = [];
    oldData.forEach(item => {
        newData.push(item.replace('=', ':'))
    })
    // console.log(newData);
    let okDate = newData.join('\n');
    // console.log(okDate);
    fs.writeFile('./files/成绩-OK.txt', okDate, function (err) {
        if (err) {
            return console.log('写入失败！' + err.message);
        }
        console.log('写入成功！');
    })
})