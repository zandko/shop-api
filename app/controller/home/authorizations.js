'use strict';

const Controller = require('egg').Controller;

class AuthorizationsController extends Controller {
  // 用户登录
  async store () {
    const { ctx, service } = this;
    const member = {
      mobile: ctx.request.body.mobile,
      password: await service.tools.md5(ctx.request.body.password)
    };

    const result = await ctx.model.Member.find(member);

    // 如果有则生成token返回状态码
    if (result[0]) {
      var token = await service.tools.createToken({
        "_id": result[0]._id,
        "mobile": result[0].mobile,
        "password": result[0].password
      });
      // 返回token与状态码
      ctx.body = {
        access_token: token,
      };
      ctx.status = 201;
    } else {
      ctx.helper.error(ctx, 422, "手机号或密码错误");
    }
  }
}

module.exports = AuthorizationsController;