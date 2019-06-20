'use strict';

const Controller = require('egg').Controller;

class ProductTypeController extends Controller {
  async index () {
    const { ctx } = this;
    const result = await ctx.model.ProductType.find();
    ctx.helper.success(ctx, result);
  }

  async store () {
    const { ctx } = this;
    const result = ctx.model.ProductType(ctx.request.body);
    await result.save();
    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.ProductType.deleteOne({ "_id": _id });
    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.ProductType.updateOne({ "_id": _id }, ctx.request.body);
    ctx.helper.noContent(ctx);
  }
}

module.exports = ProductTypeController;
