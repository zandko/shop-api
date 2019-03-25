'use strict';

const Controller = require('egg').Controller;

class AdsController extends Controller {
  // 广告列表
  async index() {
    const {ctx} = this;
    const result = await ctx.model.Ad.aggregate([
      {
        $lookup: {
          from: 'adpos',
          localField: "pos_id",
          foreignField: "_id",
          as: "items"
        }
      }
    ]);
    ctx.helper.success(ctx, result[0]);
  }

  // 添加广告
  async store() {
    const {ctx} = this;
    const pos_id = ctx.request.body.pos_id;
    const ad_type = ctx.request.body.ad_type;
    const content = ctx.request.body.ad_data;
    const result = await ctx.model.Ad.create({pos_id, ad_type, content});
    ctx.helper.created(ctx, result);
  }

  // 删除广告
  async destroy() {
    const {ctx} = this;
    const _id = ctx.params._id;
    await ctx.model.Ad.deleteOne({"_id": _id});
    ctx.helper.noContent(ctx);
  }

  // 修改广告
  async update() {
    const {ctx} = this;
    const _id = ctx.params._id;
    const pos_id = ctx.request.body.pos_id;
    const ad_type = ctx.request.body.ad_type;
    const ad_data = ctx.request.body.ad_data;
    const result = await ctx.model.Ad.updateOne({"_id": _id}, {pos_id, ad_type, ad_data});
    ctx.helper.noContent(ctx, result);
  }
}

module.exports = AdsController;
