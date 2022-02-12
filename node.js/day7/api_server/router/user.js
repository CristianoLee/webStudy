const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则的对象
const { reg_login_scheam } = require('../schema/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_scheam), userHandler.regUser)
// 登录
router.post('/login', expressJoi(reg_login_scheam), userHandler.login)

module.exports = router