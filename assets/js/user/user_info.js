$(function () {
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    },
  });

  initUserinfo();
  function initUserinfo() {
    //获取登录用户信息

    $.get("/my/userinfo", function (res) {
      console.log(res);
      //判断
      if (res.status === 0) {
        //给表单赋值
        layui.form.val("formInfo", res.data);
      } else {
      }
    });
  }

  //重置按钮
  $("#btn-reset").click(function (e) {
    e.preventDefault();
    initUserinfo();
  });

  //更新用户信息
  $("#formupdate").submit(function (e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize(), function (res) {
      if (res.status === 0) {
        // 1. 把index.js的getUserInfo再写一遍
        // 2. 调用父页面中的方法getUserInfo()
        window.parent.getUserInfo();
      }
    });
  });
});
