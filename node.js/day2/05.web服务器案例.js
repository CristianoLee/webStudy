// 1.导入相应模块
const http = require('http');
const fs = require('fs');
const path = require('path');

// 2.1 创建web服务器
const server = http.createServer();

// 2.2 监听 web 服务器的 request(请求) 事件
server.on('request', (req, res) => {
    // 3.1 获取到客户端请求的 url 地址
    const url = req.url;
    // 3.2 把请求的 url 地址映射为具体文件的存放路径
    //      /test/index.html
    //      /test/index.css
    //      /test/index.js
    // const fpath = path.join(__dirname, url);
    // 5.1 优化访问路径
    let fpath = '';
    if (url === '/') {
        fpath = path.join(__dirname, './test/index.html');
    } else {
        fpath = path.join(__dirname, '/test', url);
    }

    // 4.1 根据“映射”过来的文件路径读取文件内容
    fs.readFile(fpath, 'utf-8', (err, data) => {
        // 4.2 读取失败，向客户端响应固定的“错误消息”
        if (err) return res.end('404 Not found');
        // 4.3 读取成功，将读取成功的内容，响应给客户端
        res.end(data);
    })
})
// 2.3 启动服务器
server.listen(80, () => {
    console.log('server running at http://127.0.0.1');
})