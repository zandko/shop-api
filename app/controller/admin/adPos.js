'use strict';

const Controller = require('egg').Controller;

class AdPosController extends Controller {
  // 广告位列表
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

    const result = await ctx.model.AdPo.find({}).sort({"_id": order}).skip(page).limit(per_page);

    ctx.helper.success(ctx, result[0]);
  }

  // 添加广告位
  async store() {
    const {ctx} = this;
    const pos_name = ctx.request.body.pos_name;
    const pos_width = ctx.request.body.pos_width;
    const pos_height = ctx.request.body.pos_height;
    const result = await ctx.model.AdPo.create({pos_name, pos_width, pos_height});
    ctx.helper.created(ctx, result);
  }

  // 删除广告位
  async destroy() {
    const {ctx} = this;
    const _id = ctx.params._id;
    await ctx.model.AdPo.deleteOne({"_id": _id});
    await ctx.model.Ad.deleteMany({"pos_id": _id});  // 广告位没了 他下面的广告也会被删除
    ctx.helper.noContent(ctx);
  }

  // 修改广告位
  async update() {
    const {ctx} = this;
    const _id = ctx.params._id;
    const pos_name = ctx.request.body.pos_name;
    const pos_width = ctx.request.body.pos_width;
    const pos_height = ctx.request.body.pos_height;
    const result = await ctx.model.AdPo.updateOne({"_id": _id}, {pos_name, pos_width, pos_height});
    ctx.helper.noContent(ctx, result);
  }
}

module.exports = AdPosController;
