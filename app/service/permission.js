'use strict';

const Service = require('egg').Service;
const url = require('url');
class PermissionService extends Service {
  async check () {
    const { ctx } = this;
    // 获取token 解析用户信息
    const token = ctx.helper.getAccessToken(ctx);
    const verifuResult = await ctx.service.tools.verifyToken(token);
    const admin_id = verifuResult.message.data._id;
    // 查询当前用户有哪些角色
    const roleIds = await ctx.model.AdminRole.find({ "admin_id": admin_id });
    // 获取当前请求的url
    const pathname = url.parse(ctx.request.url).pathname;
    // 设置白名单
    const whitelist = ['/api/v1/admin/administrator', '/api/v1/admin/roles', '/api/v1/admin/administrators'];

    if (whitelist.indexOf(pathname) != -1 || verifuResult.message.data.account === "admin") {
      return true;
    } else {  // 测试
      return true;
    }

    // 获取管理员拥有的角色又拥有哪些权限
    let permission = [];
    for (let i = 0; i < roleIds.length; i++) {
      permission.push(await ctx.model.PrivilegeRole.find({ "role_id": roleIds[i].role_id }));
    }

    // 获取权限ID
    let privilege = [];
    if (permission && permission.length > 0) {
      for (let i = 0; i < permission.length; i++) {
        if (permission[0][i]) {
          privilege.push(permission[0][i].privilege_id.toString());
        }
      }
    }
    // 当前请求的url地址去权限表中查询
    const urlResult = await ctx.model.Privilege.find({ "path": pathname });
    // 如果有并且大于0 查询当前权限是否在权限ID数组中 如果在 表示管理员有这个权限访问当前页面
    if (urlResult.length > 0) {
      if (privilege.indexOf(urlResult[0]._id.toString()) != -1) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
module.exports = PermissionService;