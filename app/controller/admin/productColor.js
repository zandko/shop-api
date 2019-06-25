'use strict';

const Controller = require('egg').Controller;

class ProductColorController extends Controller {
  async index () {
    const { ctx } = this;

    const result = await ctx.model.ProductColor.find({}).sort({ "_id": -1 });

    ctx.helper.success(ctx, result);
  }

  async store () {
    const { ctx } = this;

    const result = ctx.model.ProductColor(ctx.request.body);
    await result.save();

    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx } = this;

    const _id = ctx.params._id;
    await ctx.model.ProductColor.deleteOne({ "_id": _id });

    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;

    const _id = ctx.params._id;
    await ctx.model.ProductColor.updateOne({ "_id": _id }, ctx.request.body);

    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;

    const _id = ctx.params._id;
    const result = await ctx.model.ProductColor.findById(_id);
    
    ctx.helper.success(ctx, result);
  }
}

module.exports = ProductColorController;
