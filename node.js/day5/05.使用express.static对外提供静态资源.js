const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速对外提供静态资源
app.use(express.static('./bigTest'))
app.use(express.static('./files'))

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})