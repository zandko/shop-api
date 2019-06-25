var url = require('url');  // 引入url模块

module.exports = (options, app) => {
  return async function adminauth (ctx, next) {
    // 获取当前请求的url地址
    var pathname = url.parse(ctx.request.url).pathname;
    const whitelist = [
      '/api/v1/admin/authentications',
      '/api/v1/home/authentications',
      '/api/v1/home/members',
      '/api/v1/admin/administrator'
    ];
    // 验证token
    var verify = await ctx.helper.verifyToken(ctx);
    // verify 如果为true 则继续向下执行
    if (verify) {
      const checkAuth = await ctx.service.permission.check();
      // 如果为真走下一步 反之抛出403无权访问
      if (checkAuth) {
        await next();
      } else {
        ctx.helper.error(ctx, 403, "您无权访问此页面");
      }
    } else {
      // 否则判断当前的url地址是否为登录地址 如果是继续向下执行
      if (whitelist.indexOf(pathname) != -1) {
        await next();
      }
      // 否则返回false
      return false;
    }
  };
}