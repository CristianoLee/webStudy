$(function () {
    // 渲染数据
    load();
    // 添加数据
    // 绑定键盘按下事件，如果按回车将文本框内容添加进数据
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($(this).val().trim().length == 0) {
                alert('不能为空');
            } else {
                // 获取数据
                var data = getData();
                // 将内容赋值给数据
                data.push({ title: $(this).val(), done: false });
                // 存入数据
                save(data);
                // 刷新数据
                load();
                // 清空文本框
                $(this).val('');
            }

        }
    })
    // 删除数据
    $('ul').on('click', 'a', function () {
        // 获取数据
        var data = getData();
        // 查找需要删除的数据索引值
        var index = $(this).attr('id');
        // 删除该数据
        data.splice(index, 1);
        // 保存数据
        save(data);
        // 刷新数据
        load();
    })

    // 修改数据
    $('ul').on('click', 'input', function () {
        // 获取数据
        var data = getData();
        // 获取要修改的数据索引值
        var index = $(this).siblings('a').attr('id');
        // 修改数据
        data[index].done = $(this).prop('checked');
        // 保存数据
        save(data);
        // 刷新数据
        load();
    })
    // 查询数据
    function getData() {
        // 获取数据
        var data = localStorage.getItem('todolist');
        // 如果数据不为空返回转化为对象形式的数据
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存数据
    function save(data) {
        localStorage.setItem('todolist', JSON.stringify(data))// 将数据转化为字符串存入本地数据
    }
    // 渲染页面
    function load() {
        // 清空数据
        $('.incomplete,.complete').empty();
        // 获取数据
        var data = getData();
        var todoCount = 0; // 未完成个数
        var doneCount = 0; // 已完成个数
        // 遍历数据
        $.each(data, function (i, e) {
            if (e.done) {
                $('.complete').prepend('<li><input type="checkbox" checked="checked"><p>' + e.title + '</p><a href="javascript:;" id=' + i + '></a></li>');
                doneCount++;
            } else {
                $('.incomplete').prepend('<li><input type="checkbox"><p>' + e.title + '</p><a href="javascript:;" id=' + i + '></a></li>');
                todoCount++;
            }
        });
        $('.todoCount').text(todoCount);
        $('.doneCount').text(doneCount);

    }
})