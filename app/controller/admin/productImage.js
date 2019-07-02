'use strict';

const Controller = require('egg').Controller;

class ProductImageController extends Controller {
  async index () {
    const { ctx } = this;

    const result = await ctx.model.ProductColor.find({}).sort({ "_id": -1 });

    ctx.helper.success(ctx, result);
  }

  async store () {
    const { ctx } = this;

    const result = ctx.model.ProductImage(ctx.request.body);
    await result.save();

    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx } = this;

    const _id = ctx.params._id;
    await ctx.model.ProductImage.deleteOne({ "_id": _id });

    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;

    const _id = ctx.params._id;
    await ctx.model.ProductImage.updateOne({ "_id": _id }, ctx.request.body);

    ctx.helper.noContent(ctx);
  }
}

module.exports = ProductImageController;
