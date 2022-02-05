const path = require('path')
// path.basename：可以获取到一个文件路径中文件名的部分
const fpath = path.basename('/a/b/c/index.html');
console.log(fpath); // 输出 index.html

// 用逗号分割+'文件后缀名'可以去掉后缀名，只保留文件名
const fpath2 = path.basename(fpath, '.html');
console.log(fpath2); // 输出 index