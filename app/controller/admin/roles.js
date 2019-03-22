'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {
  // 角色列表
  async index() {
    const {ctx} = this;
    // 执行查询
    const result = await ctx.model.Role.find({});
    // 返回状态
    ctx.helper.success(ctx, result);
  }

  // 添加角色
  async store() {
    const {ctx} = this;
    let role_name = ctx.request.body.role_name;
    // 执行添加
    const role = new ctx.model.Role({role_name});
    role.save();
    ctx.helper.created(ctx, role);
  }

  // 删除角色
  async destroy() {
    const {ctx} = this;
    // 获取角色ID
    let _id = ctx.params._id;
    // 执行删除
    const a =await ctx.model.Role.deleteOne({"_id": _id});
    ctx.helper.noContent(ctx);
  }

  // 修改角色
  async update() {
    const {ctx} = this;
    let _id = ctx.params._id;
    let role_name = ctx.request.body.role_name;
    // 执行修改
    await ctx.model.Role.updateOne({"_id": _id}, {
      role_name: role_name
    });
    ctx.helper.noContent(ctx);
  }

  // 获取角色
  async show() {
    const {ctx} = this;
    let _id = ctx.params._id;
    const result = await ctx.model.Role.find({"_id": _id});
    ctx.helper.success(ctx, result[0]);
  }
}

module.exports = RolesController;