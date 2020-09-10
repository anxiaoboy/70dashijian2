$.ajaxPrefilter(function (options) {
  // 一.baseurl
  options.url = "http://ajax.frontend.itheima.net" + options.url;
});
