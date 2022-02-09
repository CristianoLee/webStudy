// 1.导入 express
const express = require('express')
// 2.创建 web 服务器
const app = express()
// 4.间厅客户端的 get 和 post 请求，并向客户端响应具体内容
app.get('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
    res.send({ name: 'zs', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个文本字符串
    res.send('请求成功')
})
app.get('/', (req, res) => {
    // 通过 req.query 可以获取到客户端发送过来的查询参数
    // 注意：默认情况下，req.query 是一个空对象
    console.log(req.query);
    res.send(req.query)
})
// URL 地址中，可以通过 ：参数名的形式，匹配动态参数值
app.get('/user/:id/:name', (req, res) => {
    // req.parms 是动态匹配到的 URL 参数，默认也是一个空对象
    console.log(req.params);
    res.send(req.params)
})
// 3.启动 web 服务器
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})