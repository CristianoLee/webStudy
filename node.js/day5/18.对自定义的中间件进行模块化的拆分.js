// 导入 express 模块)
const { log } = require('console');
const express = require('express')
// 创建 express 的服务器实例
const app = express()


// 1.导入自己封装的中间件模块
const customBodyParser = require('./19.custom-body-parser')
app.use(customBodyParser)

app.post('/user', (req, res) => {
    res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})