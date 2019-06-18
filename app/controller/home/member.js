'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
  // 用户注册
  async store () {
    const { ctx, service } = this;
    const mobile = ctx.request.body.mobile;
    const password = await service.tools.md5(ctx.request.body.password);

    const isMobile = await ctx.model.Member.find({ "mobile": mobile });
    if (!isMobile[0]) {
      const result = await ctx.model.Member.create({ mobile, password });
      if (result) {
        ctx.helper.created(ctx, result);
      }
    } else {
      ctx.helper.error(ctx, 422, "手机号已存在");
    }
  }
}

module.exports = MemberController;