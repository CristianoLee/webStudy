const express = require('express')
const app = express()

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
    // 获取请求到达服务器的时间
    const time = Date.now();
    req.startTime = time;
    next()
})

app.get('/', (req, res) => {
    res.send('get' + req.startTime)
})
app.post('/', (req, res) => {
    res.send('post' + req.startTime)
})

app.listen(80, () => {
    console.log('http://127.0.0.1');
})