// 导入 express 模块)
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1.定义中间件函数
const zj = (req, res, next) => {
    console.log('调用了第1个局部生效的中间件');
    next()
}

const zj2 = (req, res, next) => {
    console.log('调用了第2个局部生效的中间件');
    next()
}

// 2.创建路由
app.get('/', [zj, zj2], (req, res) => {
    res.send('Home page')
})
app.get('/user', (req, res) => {
    res.send('User page')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
