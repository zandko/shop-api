'use strict';

const Controller = require('egg').Controller;

class ProductCategoryController extends Controller {
  async index () {
    const { ctx } = this;
    const result = await ctx.model.ProductCategory.find();
    ctx.helper.success(ctx, result);
  }

  async store () {
    const { ctx, app } = this;
    if (ctx.request.body.parent_id !== 0) {
      ctx.request.body.parent_id = app.mongoose.Types.ObjectId(ctx.request.body.parent_id);
    }
    const result = ctx.model.ProductCategory(ctx.request.body);
    await result.save();
    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx, service } = this;
    const _id = ctx.params._id;
    const result = await ctx.model.ProductCategory.findById(_id);
    if (result.icon) {
      await service.tools.deleteFile(result.icon);
    }
    await ctx.model.ProductCategory.deleteOne({ "_id": _id });
    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx, service, app } = this;
    const _id = ctx.params._id;
    const icon = ctx.request.body.icon;
    const result = await ctx.model.ProductCategory.findById(_id);
    if (result.icon !== icon) {
      await service.tools.deleteFile(result.icon);
    }
    if (ctx.request.body.parent_id !== 0) {
      ctx.request.body.parent_id = app.mongoose.Types.ObjectId(ctx.request.body.parent_id);
    }
    await ctx.model.ProductCategory.updateOne({ "_id": _id }, ctx.request.body);
    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const result = await ctx.model.ProductCategory.findById(_id);
    ctx.helper.success(ctx, result);
  }
}

module.exports = ProductCategoryController;
