// 导入定义验证规则的包
const joi = require(('@hapi/joi'))

// 定义用户名和密码的验证规则
// min 表示最小数字 max 表示最大数字 （不是表示长度）
// required() 表示非空 integer 必须是整数 string 必须是字符串
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()

// 定义头像验证规则
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()


// 定义验证注册和登录表单数据的规则对象
exports.reg_login_scheam = {
    body: {
        username,
        password
    }
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        // es6 中，如果变量名和值（键值对）相同，则可以省略不写
        id,
        nickname,
        email: user_email
    }
}

// 验证规则对象 - 更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}
