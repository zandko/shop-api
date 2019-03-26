'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {
  // 角色列表
  async index() {
    const {ctx} = this;
    // 执行查询
    let order = ctx.query.order;
    let page = ctx.query.page ? Number(ctx.query.page) : 1;
    let per_page = ctx.query.per_page ? Number(ctx.query.per_page) : 10;

    if (order === 'desc') {
      order = -1;
    } else {
      order = 1;
    }

    // 多表查询
    const result = await ctx.model.Role.aggregate([
      {
        $sort: {"_id": order} // 排序
      },
      {
        $skip: page   // 第几页开始
      },
      {
        $limit: per_page // 一页几条
      },
    ]);

    // 返回状态
    ctx.helper.success(ctx, result);
  }

  // 添加角色
  async store() {
    const {ctx} = this;
    const role_name = ctx.request.body.role_name;
    // 执行添加
    const role = new ctx.model.Role({role_name});
    role.save();
    ctx.helper.created(ctx, role);
  }

  // 删除角色
  async destroy() {
    const {ctx} = this;
    // 获取角色ID
    const _id = ctx.params._id;
    // 执行删除
    await ctx.model.Role.deleteOne({"_id": _id});
    // 同时删除此角色与权限表中的关系
    await ctx.model.PrivilegeRole.deleteMany({"role_id": _id});
    ctx.helper.noContent(ctx);
  }

  // 修改角色
  async update() {
    const {ctx} = this;
    const _id = ctx.params._id;
    const role_name = ctx.request.body.role_name;
    const privilege_id = ctx.request.body.privilege_id;

    // 执行修改
    await ctx.model.Role.updateOne({"_id": _id}, {
      role_name: role_name
    });
    // 如果有权限ID 则循序添加到中间表
    if (privilege_id.length > 0) {
      // 每次修改先删除一遍不然会造成数据重复
      await ctx.model.PrivilegeRole.deleteMany({"role_id": _id});
      for (let i = 0; i < privilege_id.length; i++) {
        await ctx.model.PrivilegeRole.create({
          "role_id": _id,
          "privilege_id": privilege_id[i]
        });
      }
    }

    ctx.helper.noContent(ctx);
  }
}

module.exports = RolesController;