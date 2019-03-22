var url = require('url');  // 引入url模块

module.exports = (options, app) => {
  return async function adminauth(ctx, next) {
    // 获取当前请求的url地址
    var pathname = url.parse(ctx.request.url).pathname;
    // 验证token
    var verify = await ctx.helper.verifyToken(ctx);
    // verify 如果为true 则继续向下执行
    if (verify) {
      await next();
    } else {
      // 否则判断当前的url地址是否为登录地址 如果是继续向下执行
      if (pathname == "/api/v1/admin/authentication") {
        await next();
      }
      // 否则返回false
      return false;
    }
  };
}