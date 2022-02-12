// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 sql 语句
    const sql = `select id,username,nickname,email,user_pic from ev_users where id = ?`
    // 调用 db.query() 执行 sql 语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行 sql 失败
        if (err) return res.msg(err)
        // 执行 sql 成功，但查询的结果可能为空
        if (results.length !== 1) return res.msg('获取用户信息失败！')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })

}

// 更新用户基本信息的处理函数exports.getUserInfo = (req, res) => {
// 调用 db.query() 执行 sql 语句
exports.updateUserInfo = (req, res) => {
    // 定义待执行的 sql 语句
    const sql = `update ev_users set ? where id=?`
    // 调用 db.query() 执行 sql 语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 sql 语句失败
        if (err) return res.msg(err)
        // 执行 sql 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.msg('更新用户信息失败！')
        // 成功
        res.msg('更新用户信息成功！', 0)
    })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    // 定义根据 id 查询用户数据
    const sql = `select * from ev_users where id=?`

    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.msg(err)

        // 检查指定 id 的用户是否存在
        if (results.length !== 1) return res.msg('用户不存在！')

        // TODO：判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.msg('原密码错误！')

        // 定义更新密码的 sql 语句
        const sql = `update ev_users set password=? where id=?`

        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        // 执行 SQL 语句，根据 id 更新用户的密码
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.msg(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.msg('更新密码失败！')

            // 更新密码成功
            res.msg('更新密码成功！', 0)
        })
    })

}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    // 1.定义更新头像的 sql 语句
    const sql = 'update ev_users set user_pic=? where id=?'
    // 调用 db.query() 执行 sql 语句，更新对应用户的头像：
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 sql 语句失败
        if (err) return res.msg(err)

        // 执行 sql 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.msg('更新头像失败！')

        // 更新用户头像成功
        return res.msg('更新头像成功！', 0)
    })

}
