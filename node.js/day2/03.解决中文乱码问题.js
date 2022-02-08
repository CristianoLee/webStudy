const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    const str = `您请求的 url 地址是 ${req.url},请求的 method 类型为 ${req.method}`;
    // 解决中文乱码
    res.setHeader('content-type', 'text/html;charset=utf-8');
    // res.end() 将内容响应给客户端
    res.end(str);
})
server.listen(80, () => {
    console.log('server running at http://127.0.0.1');
})