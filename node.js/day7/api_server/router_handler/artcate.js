// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 获取文章分类的路由处理函数
exports.getArtCates = (req, res) => {
    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    // 调用 db.query() 执行 sql 语句
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.msg(err)
        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })

}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    const sql = `select * from ev_article_cate where name=? or alias=?`
    // 执行查重操作
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.msg(err)

        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.msg('分类名称与别名被占用，请更换后重试！')
        // 分类名称和别名被同一条数据占用
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.msg('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.msg('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.msg('分类别名被占用，请更换后重试！')

        // TODO：新增文章分类
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.msg(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.msg('新增文章分类失败！')

            // 新增文章分类成功
            res.msg('新增文章分类成功！', 0)
        })

    })

}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    // 定义删除文章分类的 SQL 语句：
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    // 调用 db.query() 执行删除文章分类的 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.msg(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.msg('删除文章分类失败！')

        // 删除文章分类成功
        res.msg('删除文章分类成功！', 0)
    })

}

// 根据 Id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
    // 定义根据 Id 获取文章分类的 SQL 语句
    const sql = `select * from ev_article_cate where is_delete = 0 and id=?`
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.msg(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.msg('获取文章分类数据失败！')

        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0],
        })
    })
}

// 根据 Id 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    console.log('客户端：' + req.body.name);
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
    // 执行查重操作
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.msg(err)

        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.msg('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.msg('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.msg('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.msg('分类别名被占用，请更换后重试！')

        // TODO：更新文章分类
        const sql = `update ev_article_cate set ? where Id=?`
        // 调用 db.query() 执行 SQL 语句
        db.query(sql, [req.body, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.msg(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.msg('更新文章分类失败！')

            // 更新文章分类成功
            res.msg('更新文章分类成功！', 0)
        })

    })

}


