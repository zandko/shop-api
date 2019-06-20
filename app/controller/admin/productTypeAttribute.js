'use strict';

const Controller = require('egg').Controller;

class ProductTypeAttributeController extends Controller {
  async index () {
    const { ctx, app } = this;
    const _id = ctx.params._id;
    const productType = await ctx.model.ProductType.findById(_id);
    const result = await ctx.model.ProductTypeAttribute.aggregate([
      {
        $lookup: {
          from: "producttypes",
          localField: "product_type_id",
          foreignField: "_id",
          as: "producttypes"
        }
      },
      {
        $match: {
          "product_type_id": app.mongoose.Types.ObjectId(_id)
        }
      }
    ]);
    ctx.helper.success(ctx, {
      productType,
      result
    });
  }

  async store () {
    const { ctx } = this;
    const result = new ctx.model.ProductTypeAttribute(ctx.request.body);
    await result.save();
    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.ProductTypeAttribute.deleteOne({ "_id": _id });
    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.ProductTypeAttribute.updateOne({ "_id": _id }, ctx.request.body);
    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const result = await ctx.model.ProductTypeAttribute.findById(_id);
    ctx.helper.success(ctx, result);
  }
}

module.exports = ProductTypeAttributeController;
