// 1.导入 mysql 模块
const mysql = require('mysql')
// 2.建立与 mysql 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的 ip 地址
    user: 'root', // 数据库账号
    password: '123456', // 数据库密码
    database: 'node' // 指定要操作哪个数据库
})

// 测试 mysql 模块是否能正常工作
// db.query('select 1 ', (err, results) => {
//     // mysql 模块工作期间报错了则执行
//     if (err) return console.log(err.message);
//     // 能够成功执行 sql 语句
//     console.log(results);
// })

// 查询 users 表中所有的数据
// db.query('select * from users ', (err, results) => {
//     // 查询数据失败
//     if (err) return console.log(err.message);
//     // 查询数据成功
//     // 注意：如果执行的是 select 查询语句，则执行结果为数组形式
//     console.log(results);
// })

// 向 users 表中，新增一条数据
// 注意：如果直接将 sql 写在 query里会有 sql 注入的风险
// const addUser = { username: 'spiderMan', password: 'zzx' }
// // 定义待执行的 sql 语句
// const sqlStr = 'insert into users (username,password) values(?,?)'
// // 执行 sql 语句
// db.query(sqlStr, [addUser.username, addUser.password], (err, results) => {
//     // 查询数据失败
//     if (err) return console.log(err.message);
//     // 查询数据成功
//     // 注意：如果执行的是 insert into 插入语句，则执行结果为对象形式
//     // results.affectedRows 影响行数等于 1 则代表执行成功了
//     if (results.affectedRows === 1) {
//         console.log('添加用户成功！');
//     }
// })

// 演示插入数据的便捷方式
// const addUser = { username: 'spiderMan2', password: 'zzx' }
// // 定义待执行的 sql 语句
// const sqlStr = 'insert into users set ?'
// // 执行 sql 语句
// db.query(sqlStr, addUser, (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log('添加用户成功！');
//     }
// })

// 演示如何更新用户信息
// const updateUser = { id: 5, username: 'aaa', password: 'zzx' }
// // 定义待执行的 sql 语句
// const sqlStr = 'update users set username = ?,password = ? where id = ?'
// // 执行 sql 语句
// db.query(sqlStr, [updateUser.username, updateUser.password, updateUser.id], (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log('修改用户数据成功！');
//     }
// })

// 演示更新数据的便捷方式
// const updateUser = { id: 5, username: 'aaa', password: '000' }
// // 定义待执行的 sql 语句
// const sqlStr = 'update users set ? where id=?'
// // 执行 sql 语句
// db.query(sqlStr, [updateUser, updateUser.id], (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log('修改用户数据成功！');
//     }
// })

// 删除 id 为 5 的用户
// const sqlStr = 'delete from users where id=?'
// db.query(sqlStr, 5, (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log('删除用户成功！');
//     }
// })

// 标记删除
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 4], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('标记删除成功！');
    }
})