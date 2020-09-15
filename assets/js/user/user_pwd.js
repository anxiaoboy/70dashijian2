$(function () {
  layui.form.verify({
    len: [/^\S{6,12}$/, "长度必须6到12位，不能有空格"],

    //验证新密码不能和原密码相同
    diff: function (value) {
      //value获取新密码
      //获取原密码
      let oldPwd = $('[name= "oldPwd"]').val();
      if (value === oldPwd) {
        return "新密码不能和原密码相同";
      }
    },

    //验证两次新密码必须相同
    same: function (value) {
      //value 表示确认密码
      //获取新密码
      let newPwd = $('[name="newPwd"]').val();
      if (value !== newPwd) {
        return "新密码输入不一致";
      }
    },
  });

  //修改密码
  $("#changPwd").click(function (e) {
    e.preventDefault();

    $.post("/my/updatepwd", $("#formInfo").serialize(), function (res) {
      if (res.status === 0) {
        //提示框
        //重新按钮触发
        $('button[type="reset"]').click();
      } else {
      }
    });
  });
});
