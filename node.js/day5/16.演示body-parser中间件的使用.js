// 导入 express 模块)
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1.导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 2.使用 app.use() 注册中间件
app.use(parser.urlencoded({ extends: false }))
// app.use(express.urlencoded({ extends: false }))

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})