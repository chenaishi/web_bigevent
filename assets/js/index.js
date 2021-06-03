$(function () {
    getUserInfo();
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清除本地存储中的token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页面
            location.href = '/login.html';
            // 关闭cinfirm询问框
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
    }
}