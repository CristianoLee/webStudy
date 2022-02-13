// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
const joi = require(('@hapi/joi'))

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前，封装 res.msg 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误的对象，也可能是一个错误的描述字符串
    res.msg = function (err, status = 1, token) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
            token: token
        })
    }
    next()
})

// 一定要在路由之前,配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

// unless/过滤器 表示哪些接口不需要访问权限，api 目录下的登录、注册不需要token就能直接访问（相当于java中的fliter过滤路径）
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
// 导入并使用文章分类的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)



// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 数据验证失败导致的错误 / 账号或密码出错
    if (err instanceof joi.ValidationError) return res.msg(err)
    // 捕获身份认证失败的错误/未登录
    if (err.name === 'UnauthorizedError') return res.msg('身份认证失败！')
    // 未知错误
    res.msg(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})