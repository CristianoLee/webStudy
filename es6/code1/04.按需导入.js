// as + 新名称 可以重命名接收名称
// 默认导入和按需导入可以同时使用，用逗号隔开
import info, { s1, s2 as x2, say } from './03.按需导出.js'
console.log(s1, x2, say)
console.log(info)
