'use strict';

const Controller = require('egg').Controller;

class AdPosController extends Controller {
  // 广告位列表
  async index() {
    const {ctx} = this;
    const result = await ctx.model.AdPo.find({});
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
