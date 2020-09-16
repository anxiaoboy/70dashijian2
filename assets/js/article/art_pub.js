$(function () {
  var state = "已发布";

  $("#caogao").click(function () {
    state = "草稿";
  });
  // 初始化富文本编辑器
  initEditor();
  //获取分类
  $.get(`/my/article/cates`, function (res) {
    if (res.status === 0) {
      var strHtml = template("cate", res);
      $("[name=cate_id]").html(strHtml);
      layui.form.render();
    }
  });

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $("#chooseImage").click(function (e) {
    $("#file").click();
  });

  $("#file").change(function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //表单提交
  $("#formpub").submit(function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    fd.append("state", state);

    //获取选择的图片后 利用toBlob转换成接口要的进制数据
    $image
      .cropper("getCroppedCanvas", {
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img", blob);

        $.ajax({
          url: `/my/article/add`,
          data: fd,
          method: "POST",
          //使用formData时需要设置的
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res);
            if (res.status === 0) {
              window.location.href = "/article/art_list.html";
            }
          },
        });
      });
  });
});
