$(function () {
  //获取登录后保存在本地的token
  // var token = window.localStorage.getItem("token") || "";

  getUserInfo();

  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        if (res.status === 1) return;
        var resname = res.data.nickname || res.data.username;
        $("#welcome").html(resname);
        //存在，显示图片头像 隐藏文字头像
        if (res.data.user_pic) {
          $(".layui-nav-img").attr("src", res.data.user_pic).show();
          $(".text-avatar").hide();
        } else {
          $(".layui-nav-img").hide();
          $(".text-avatar").html(resname[0].toUpperCase());
        }
      },
    });
  }
  window.getUserInfo = getUserInfo;

  //用户退出

  $("#btn-logout").click(function (e) {
    e.preventDefault();
    //确认框
    layui.layer.confirm("确定退出?", { icon: 3, title: "提示" }, function (
      index
    ) {
      window.localStorage.removeItem("token");
      //1.跳转登录
      window.location.href = "/login.html";
      layer.close(index);
    });
  });
});
