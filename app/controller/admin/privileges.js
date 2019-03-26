'use strict';

const Controller = require('egg').Controller;

class PrivilegesController extends Controller {
  // 权限列表
  async index() {
    const {ctx} = this;
    let order = ctx.query.order;
    let page = ctx.query.page ? Number(ctx.query.page) : 1;
    let per_page = ctx.query.per_page ? Number(ctx.query.per_page) : 10;

    if (order === 'desc') {
      order = -1;
    } else {
      order = 1;
    }
    // 自查询
    const result = await ctx.model.Privilege.aggregate([
      {
        $lookup: {
          from: 'privileges',
          localField: "_id",
          foreignField: "parent_id",
          as: "items"
        }
      },
      {
        $match: {
          "parent_id": "0"
        }
      },
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
    // 返回响应信息
    ctx.helper.success(ctx, result);
  }

  async store() {
    const {ctx, app} = this;
    // 获取参数
    const name = ctx.request.body.pri_name;
    const pid = ctx.request.body.parent_id;
    // 为了自查寻这里添加parent_id的时候必须要转为ObjectId
    const parent_id = pid ? app.mongoose.Types.ObjectId(pid) : pid;
    const method = ctx.request.body.method;
    const path = ctx.request.body.resource;
    // 查询当前名称存不存在
    const oneResult = await ctx.model.Privilege.find({"name": name});
    // 如果不存在则添加权限
    if (!oneResult[0]) {
      const result = await ctx.model.Privilege.create({
        name, parent_id, method, path
      });
      ctx.helper.created(ctx, result);
    } else {
      ctx.helper.error(ctx, 422, "权限名称已存在");
    }
  }

  async destroy() {
    const {ctx} = this;
    const _id = ctx.params._id;
    const result = await ctx.model.Privilege.find({"_id": _id});
    // 如过存在则删除 同时删除子节点
    if (result) {
      await ctx.model.Privilege.deleteOne({"_id": _id});
      const PrivilegeResult = await ctx.model.Privilege.find({"parent_id": _id});
      if (PrivilegeResult) {
        await ctx.model.Privilege.deleteMany({"parent_id": _id});
      }
      ctx.helper.noContent(ctx);
    } else {
      ctx.helper.error(ctx, 404, "该权限不存在");
    }
  }

  async update() {
    const {ctx} = this;
    // 这里跟添加的时候基本一样  只是添加了一个_id的条件
    const name = ctx.request.body.pri_name;
    const parent_id = ctx.request.body.parent_id;
    const method = ctx.request.body.method;
    const path = ctx.request.body.resource;
    const _id = ctx.params._id;
    const oneResult = await ctx.model.Privilege.find({"name": name});
    if (!oneResult[0]) {
      await ctx.model.Privilege.updateOne({"_id": _id}, {
        name, parent_id, method, path
      });
      ctx.helper.noContent(ctx);
    } else {
      ctx.helper.error(ctx, 422, "权限名称已存在");
    }
  }
}

module.exports = PrivilegesController;