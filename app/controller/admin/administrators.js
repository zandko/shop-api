'use strict';

const Controller = require('egg').Controller;

class AdministratorsController extends Controller {
  // 管理员列表
  async index () {
    const { ctx } = this;

    const result = await ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: "adminroles",
          localField: "_id",
          foreignField: "admin_id",
          as: "admins",
        }
      },
      {
        $sort: { "_id": -1 }
      },
    ]);
    const adminList = []
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].account === 'admin') {
          adminList.push({
            _id: result[i]._id,
            account: result[i].account,
            avatar: result[i].avatar,
            created_at: result[i].created_at,
            roles: ['超级管理员']
          })
        }
        if (result[i].admins.length > 0) {
          const roles = []
          const role_id = []
          for (let j = 0; j < result[i].admins.length; j++) {
            const role = await ctx.model.Role.findById(result[i].admins[j].role_id);
            roles.push(role.role_name)
            role_id.push(role._id)
          }
          adminList.push({
            _id: result[i]._id,
            account: result[i].account,
            avatar: result[i].avatar,
            created_at: result[i].created_at,
            roles: roles,
            role_id: role_id
          })
        }
      }
    }
    ctx.helper.success(ctx, adminList);
  }

  // 添加管理员
  async store () {
    const { ctx, service } = this;
    // 获取用户名与密码 和角色ID
    const account = ctx.request.body.account;
    const avatar = ctx.request.body.avatar;
    const password = await service.tools.md5(ctx.request.body.password);
    const role_id = ctx.request.body.role_id;
    const isAccount = await ctx.model.Admin.find({ "account": account });
    if (!isAccount[0]) {
      // 把用户名与密码添加到数据库
      const result = await ctx.model.Admin.create({ account, avatar, password });
      // 如果添加成功
      if (result) {
        // 判断role_id 是不是一个数组
        if (role_id instanceof Array && role_id.length > 0) {
          // 循环添加到数据库
          for (let i = 0; i < role_id.length; i++) {
            await ctx.model.AdminRole.create({ "admin_id": result._id, "role_id": role_id[i] });
          }
        }
        // 返回信息
        ctx.helper.created(ctx, result);
      }
    } else {
      ctx.helper.error(ctx, 422, "用户名账号已存在");
    }
  }

  // 删除管理员
  async destroy () {
    const { ctx } = this;
    // 获取admin ID
    const admin_id = ctx.params._id;
    // 删除管理员并删除关联表数据
    await ctx.model.Admin.deleteOne({ "_id": admin_id });
    const result = await ctx.model.AdminRole.find({ "admin_id": admin_id });
    if (result.length > 0) {
      await ctx.model.AdminRole.deleteMany({ "admin_id": admin_id });
    }
    // 返回信息
    ctx.helper.noContent(ctx);
  }

  // 修改管理员
  async update () {
    const { ctx, service } = this;
    // 获取参数
    const admin_id = ctx.params._id;
    const role_id = ctx.request.body.role_id;
    const avatar = ctx.request.body.avatar;
    // 如果管理员密码被修改md5 否则是null 方便下面的判断
    const password = ctx.request.body.password ? await service.tools.md5(ctx.request.body.password) : null;
    // 查询中间表存不存在管理员ID
    const result = await ctx.model.AdminRole.find({ "_id": admin_id });
    if (result) {
      // 存在全部删除
      await ctx.model.AdminRole.deleteMany({ "admin_id": admin_id });
    }
    if (avatar) {
      await ctx.model.Admin.updateOne({ "_id": admin_id }, { "avatar": avatar });
    }
    // 密码如果存在 更改密码并且循环再把关联关系添加到中间表
    if (password) {
      await ctx.model.Admin.updateOne({ "_id": admin_id }, { "password": password });
      if (role_id && role_id.length > 0) {
        for (let i = 0; i < role_id.length; i++) {
          await ctx.model.AdminROle.create({ "admin_id": admin_id, "role_id": role_id[i] });
        }
      }
      ctx.helper.noContent(ctx);
    } else {
      // 用户不修改密码 也要把关联关心添加到中间表
      if (role_id && role_id.length > 0) {
        for (let i = 0; i < role_id.length; i++) {
          await ctx.model.AdminRole.create({ "admin_id": admin_id, "role_id": role_id[i] });
        }
      }
      ctx.helper.noContent(ctx);
    }
  }
  async find () {
    const { ctx } = this;
    const verifuResult = await ctx.service.tools.verifyToken(ctx.query.token);
    if (verifuResult.message.data.account === 'admin') {
      verifuResult.message.data.roles = ['admin']
    } else {
      const result = await ctx.model.AdminRole.find({ "admin_id": verifuResult.message.data._id });
      const roles = []
      for (let i = 0; i < result.length; i++) {
        const role = await ctx.model.Role.findById(result[i].role_id);
        roles.push(role.role_name)
      }
      verifuResult.message.data.roles = roles
    }
    ctx.helper.success(ctx, verifuResult.message.data);
  }
}

module.exports = AdministratorsController;