// 格式化时间
let pig = {
    dateFormat(data) {
        let time = new Date()
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        let hh = time.getHours()
        let mm = time.getMinutes()
        let ss = time.getSeconds()
        if (!data || data === '') {
            return y + '-' + pig.padZero(m) + '-' + pig.padZero(d) + ' ' + pig.padZero(hh) + ':' + pig.padZero(mm) + ':' + pig.padZero(ss)
        } else if (data === 'YYYY-MM-DD' || data === 'yyyy-mm-dd') {
            return y + '-' + pig.padZero(m) + '-' + pig.padZero(d)
        } else if (data === 'YEAR' || data === 'year') {
            return y
        } else if (data === 'MONTH' || data === 'month') {
            return pig.padZero(m)
        } else if (data === 'DAY' || data === 'day') {
            return pig.padZero(d)
        } else if (data === 'chi') {
            return y + '年' + pig.padZero(m) + '月' + pig.padZero(d) + '日 ' + pig.padZero(hh) + '时' + pig.padZero(mm) + '分' + pig.padZero(ss) + '秒'
        } else {
            throw new Error("您的语法有误，请重新输入参数!错误参数：" + data
                + '\nYour syntax is wrong, please re-enter the parameter! Wrong parameter is:' + data);
        }
    },
    padZero(time) {
        return time > 9 ? time : '0' + time
    }
}