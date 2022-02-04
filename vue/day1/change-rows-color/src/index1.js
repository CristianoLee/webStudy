// 1.使用ES6 导入语法，导入jquery
import $ from 'jquery'

// 2.定义jquery入口函数
$(function () {
    // 3.实现奇偶行变色
    $('li:odd').css('background-color', 'cyan')
    $('li:even').css('background-color', 'pink')

})

