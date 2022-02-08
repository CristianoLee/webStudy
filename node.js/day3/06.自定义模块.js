// 在一个自定义模块中，默认情况下，module.exports = {}
// 向 module.exports 对象上挂在 username 属性
module.exports.username = 'zs'
// 向 module.exports 对象上挂在 sayHello 方法
module.exports.sayHello = function sayHello() {
    console.log('Hello!');
}

const age = 20;

module.exports.age = age;

// 让 module.exports 指向一个全新的对象
module.exports = {
    nikename: '小黑',
    sayHi() {
        console.log('Hi!');
    }
}