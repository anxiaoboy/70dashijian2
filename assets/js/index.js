$(function () {
  var token = window.localStorage.getItem("token") || "";
  $.ajax({
    url: "/my/userinfo",
    success: function (res) {
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

  //用户退出

  $("#btn-logout").click(function (e) {
    e.preventDefault();
    //确认框
    layui.layer.confirm("is not?", { icon: 3, title: "提示" }, function (
      index
    ) {
      window.localStorage.removeItem("token");
      //1.跳转登录
      window.location.href = "/login.html";
      layer.close(index);
    });
  });
});
