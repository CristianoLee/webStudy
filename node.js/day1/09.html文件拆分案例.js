// 1.导入fs模块读写文件
const fs = require('fs')
// 2.导入path模块处理文件路径
const path = require('path')

// 3.定义正则表达式，分别匹配html,css,js
// s空白字符，S非空字符，*代表所有：完整意思，取出该标签内所有字符
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 调用fs.readFile()方法读取文件
fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function (err, data) {
    if (err) return console.log('读取HTML文件失败！' + err.message);
    splitHTMLFile(data);
})

// 封装将html文件拆分为html,css,js文件方法
function splitHTMLFile(htmlStr) {
    resolveHTML(htmlStr);
    resolveCSS(htmlStr);
    resolveJS(htmlStr);
    // 定义处理html的方法
    function resolveHTML(htmlStr) {
        // 使用正则提取需要的内容
        const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css">').replace(regScript, '<script src="./index.js"></script>')
        // console.log(newHTML);
        fs.writeFile(path.join(__dirname, '案例/index.html'), newHTML, function (err) {
            if (err) return console.log('写入HTML文件失败' + err.message);
            console.log('写入HTML文件成功');
        })
    }

    // 定义处理css样式的方法
    function resolveCSS(htmlStr) {
        // 使用正则提取需要的内容
        const r2 = regStyle.exec(htmlStr);
        const newCSS = r2[0].replace('<style>', '').replace('</style>', '')
        // console.log(newCSS);
        fs.writeFile(path.join(__dirname, '案例/index.css'), newCSS, function (err) {
            if (err) return console.log('写入CSS文件失败' + err.message);
            console.log('写入CSS文件成功');
        })
    }

    // 定义处理js样式的方法
    function resolveJS(htmlStr) {
        // 使用正则提取需要的内容
        const r3 = regScript.exec(htmlStr);
        const newJS = r3[0].replace('<script>', '').replace('</script>', '')
        // console.log(newJS);
        fs.writeFile(path.join(__dirname, '案例/index.js'), newJS, function (err) {
            if (err) return console.log('写入JS文件失败' + err.message);
            console.log('写入JS文件成功');
        })
    }
}