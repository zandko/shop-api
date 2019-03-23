'use strict';

const Controller = require('egg').Controller;

class AdministratorsController extends Controller {
  // 管理员列表
  async index() {
    const {ctx} = this;
    // 未完待续 O(∩_∩)O哈哈~
    const adminResult = await ctx.model.Admin.find({});
    let AdminRolesResule = [];
    for (let i = 0; i < adminResult.length; i++) {
      let AdminRoleResule = await ctx.model.AdminRole.find({"admin_id": adminResult[i]._id});
      if (AdminRoleResule.length > 0) {
        AdminRolesResule.push(AdminRoleResule)
      }
    }

    let ResulesResult =[];
    for (let i = 0; i < AdminRolesResule.length; i++) {
      for (let j = 0; j <= i ; j++) {
        ResulesResult.push(await ctx.model.Role.find({"_id": AdminRolesResule[i][j].role_id}));
      }
    }

    console.log(ResulesResult);
    // ctx.helper.success(ctx, adminResult);
  }

  // 添加管理员
  async store() {
    const {ctx, service} = this;
    // 获取用户名与密码 和角色ID
    const account = ctx.request.body.account;
    const password = await service.tools.md5(ctx.request.body.password);
    const role_id = ctx.request.body.role_id;
    const isAccount = await ctx.model.Admin.find({"account": account});
    if (!isAccount) {
      // 把用户名与密码添加到数据库
      const result = await ctx.model.Admin.create({account, password});
      // 如果添加成功
      if (result) {
        // 判断role_id 是不是一个数组
        if (role_id instanceof Array) {
          // 循环添加到数据库
          for (let i = 0; i < role_id.length; i++) {
            await ctx.model.AdminRole.create({"admin_id": result._id, "role_id": role_id[i]});
          }
          // 返回信息
          ctx.helper.created(ctx, result);
        }
      }
    } else {
      ctx.helper.error(ctx, 403, "用户名账号已存在");
    }
  }

  // 删除管理员
  async destroy() {
    const {ctx} = this;
    // 获取admin ID
    const admin_id = ctx.params._id;
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
    const {ctx, service} = this;
    // 获取参数
    const admin_id = ctx.params._id;
    const role_id = ctx.request.body.role_id;
    // 如果管理员密码被修改md5 否则是null 方便下面的判断
    const password = ctx.request.body.password ? await service.tools.md5(ctx.request.body.password) : null;
    // 查询中间表存不存在管理员ID
    const result = await ctx.model.AdminRole.find({"_id": admin_id});
    if (result) {
      // 存在全部删除
      await ctx.model.AdminRole.deleteMany({"admin_id": admin_id});
    }
    // 密码如果存在 更改密码并且循环再把关联关系添加到中间表
    if (password) {
      await ctx.model.Admin.updateOne({"_id": admin_id}, {"password": password});
      for (let i = 0; i < role_id.length; i++) {
        await ctx.model.AdminROle.create({"admin_id": admin_id, "role_id": role_id[i]});
      }
      ctx.helper.noContent(ctx);
    } else {
      // 用户不修改密码 也要把关联关心添加到中间表
      for (let i = 0; i < role_id.length; i++) {
        await ctx.model.AdminRole.create({"admin_id": admin_id, "role_id": role_id[i]});
      }
      ctx.helper.noContent(ctx);
    }
  }

  // 查询管理员
  async show() {
    const {ctx} = this;
    const _id = ctx.params._id;
    // 根据ID查询Admin表
    const Adminresult = await ctx.model.Admin.find({"_id": _id});
    // 根据ID查询AdminRole表
    const AdminRoleResule = await ctx.model.AdminRole.find({"admin_id": _id});
    let ResuleResult = [];
    // 根据AdminRoleResule数据中的ID 循环去查找role表对应的ID数据
    for (let i = 0; i < Adminresult.length; i++) {
      ResuleResult.push(await ctx.model.Role.find({"_id": AdminRoleResule[i].role_id}));
    }
    const data = {
      "admin": Adminresult,
      "resule": ResuleResult
    };
    ctx.helper.success(ctx, data);
  }
}

module.exports = AdministratorsController;