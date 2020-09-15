$(function () {
  //1.1获取裁剪区DOM对象
  var $image = $("#image");

  //1.2配置选项
  var options = {
    aspectRatio: 1,
    //指定预览区域
    preview: ".img-preview",
  };

  //1.3创建裁剪区域
  $image.cropper(options);

  //上传按钮
  $("#btn-upload").click(function () {
    $("#file").click();
    //获取图片
    // var file = e.target.files[0];
    // //根据选择文件，创建一个对应的url  地址:
    // var newImgURL = URL.createjectURL(file);
  });

  //需求:获取input前最新value值
  $("input").on("change", function (e) {
    // e.target.value;
    var file = e.target.files[0];
    //根据选择文件，创建一个对应的url  地址:
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //确定上传

  $("#sure").on("click", function (e) {
    e.preventDefault();
    //获取图片

    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // console.log(dataURL)
    //发送请求
    $.post("/my/update/avatar", { avatar: dataURL }, function (res) {
      if (res.status === 0) {
        // console.log(res.message);
        //调用父页面的方法形成的父页面index，html内嵌的index.js方法
        window.parent.getUserInfo();
      }
    });
  });
});
