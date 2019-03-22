'use strict';

const Controller = require('egg').Controller;

class AdministratorsController extends Controller {
  // 管理员列表
  async index() {

  }

  // 添加管理员
  async store() {
    const {ctx, service} = this;
    // 获取用户名与密码 和角色ID
    let account = ctx.request.body.account;
    let password = await service.tools.md5(ctx.request.body.password);
    let role_id = ctx.request.body.role_id;
    // 把用户名与密码添加到数据库
    const result = await ctx.model.Admin.create({account, password});
    // 如果添加成功
    if (result) {
      // 判断role_id 是不是一个数组
      if (role_id instanceof Array) {
        // 循环添加到数据库
        for (let i = 0; i < role_id.length; i++) {
          await ctx.model.AdminRole.create({admin_id: result._id, role_id: role_id[i]});
        }
        // 返回信息
        ctx.helper.created(ctx, result);
      }
    }
  }

  // 删除管理员
  async destroy() {
    const {ctx} = this;
    // 获取admin ID
    let admin_id = ctx.params._id;
    // 删除管理员并删除关联表数据
    await ctx.model.Admin.deleteOne({"_id": admin_id});
    const result = await ctx.model.AdminRole.find({"admin_id": admin_id});
    if (result.length > 0) {
      await ctx.model.AdminRole.deleteMany({"admin_id": admin_id});
    }
    // 返回信息
    ctx.helper.noContent(ctx);
  }

  // 修改管理员
  async update() {

  }

  // 查询管理员
  async show() {

  }
}

module.exports = AdministratorsController;