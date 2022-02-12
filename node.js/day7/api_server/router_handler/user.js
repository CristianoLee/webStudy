/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcrypt 这个包对密码进行加密
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    // 对表单中的数据，进行合法性校验
    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({ status: 1, message: '用户名或密码不能为空！' })
    //     return res.msg('用户名或密码不合法！')
    // }

    // 定义 sql 语句，查询用户名是否被占用
    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 sql 语句失败
        if (err) {
            // return res.send({ status: 1, msg: err.message })
            return res.msg(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, msg: '用户名被占用，请更换其他用户名！' })
            return res.msg('用户名被占用，请更换其他用户名！')
        }
        // TODO:用户名可以使用
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 定义插入新用户的 sql 语句
        const sql = 'insert into ev_users set ?'
        // 调用 db.query() 执行 sql 语句
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 判断 sql 语句是否执行成功
            // if (err) return res.send({ status: 1, msg: err.message })
            if (err) return res.msg(err)
            // 判断影响行数是否为 1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' }
                return res.msg('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.msg('注册成功！', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    // 定义 sql 语句
    const sql = `select * from ev_users where username=?`
    // 执行 sql 语句，根据用户名查询用户信息
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.msg(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.msg('用户名错误！')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.msg('密码错误！')
        // TODO：登录成功，生成 Token 字符串
        const user = { ...results[0], password: '', user_pic: '' }
        // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // 调用 res.send() 将 Token 响应给客户端
        res.msg('登陆成功！', 0, 'Bearer ' + tokenStr)
    })
}
