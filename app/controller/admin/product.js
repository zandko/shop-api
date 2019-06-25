'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index () {

  }

  async store () {
    const { ctx } = this;
    console.log(ctx.request.body)
  }

  async destroy () {
    
  }

  async update () {

  }

  async find () {

  }

  async productColorAndType () {
    const { ctx } = this;

    const productColor = await ctx.model.productColor.find();
    const productType = await ctx.model.productType.find();

    ctx.helper.created(ctx, {
      productColor,
      productType
    });
  }

  async productTypeAttribute () {
    const { ctx } = this;

    const _id = ctx.params._id;
    const result = await ctx.model.productTypeAttribute.find({ "product_type_id": _id });

    ctx.helper.success(ctx, result);
  }
}

module.exports = ProductController;
