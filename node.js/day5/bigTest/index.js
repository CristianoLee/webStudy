window.addEventListener('load', function () {
    // dom加载完直接执行，防止刚进入页面，时间对不上
    clock();

    // 每秒执行一次获取当前时间
    setInterval(() => {
        clock()
    }, 1000);

    // 时分秒补零
    function padZero(data) {
        return data > 9 ? data : '0' + data
    }

    // 获取当前时间并赋值给时钟div
    function clock() {
        let date = new Date();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        document.querySelector('.hh').innerHTML = padZero(hh);
        document.querySelector('.mm').innerHTML = padZero(mm);
        document.querySelector('.ss').innerHTML = padZero(ss);
    }

})

