$(function () {
  // link-login
  $("#link-login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //link-reg
  $("#link-reg").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 自定义规则
  //验证登陆页密码
  layui.form.verify({
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    repassword: function (value) {
      if ($("#reg-psd").val() !== value) {
        return "密码不一致";
      }
    },
  });

  //发送注册请求reg-btn

  //绑定submit事件

  $("#layui-form").submit(function (e) {
    //阻止默认提交行为
    e.preventDefault();
    //获取表单数据
    var username = $("#reg-username").val();
    var password = $("#reg-psd").val();
    //看接口文档
    var formdata = {
      username: username,
      password: password,
    };
    $.post("/api/reguser", formdata, function (res) {
      //处理响应
      if (res.status === 0) {
        $("#link-reg").click();
      }

      //进入登录页面index.html
      layui.layer.msg(res.message);
    });
  });
  // login请求
  $("#login-form").submit(function (e) {
    //阻止默认提交行为
    e.preventDefault();
    //获取表单元素
    var formdata = $(this).serialize();
    $.post("/api/login", formdata, function (res) {
      if (res.status === 0) {
        window.location.href = "/index.html";
        res.token.length !== 0 &&
          window.localStorage.setItem("token", res.token);
      }
      layui.layer.msg(res.message);
    });
  });
});
