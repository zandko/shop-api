'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const { ctx } = this;

    const carouseResult = ctx.model.Carouse.find({ "is_enable": 1 }).sort({ "_id": -1 });
    const product = ctx.model.Product.find({}).limit(8);
    const productCategory = await ctx.model.ProductCategory.find({}).sort({ "_id": -1 }).limit(8);

    ctx.helper.success(ctx, {
      carouseResult,
      product,
      productCategory
    })
  }

  async getCategoryProduct () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const result = ctx.model.Product.find({ "_product_category_id": _id, "is_rec": 1, "status": 1 }).sort({ "_id": - 1 }).limit(8);

    ctx.helper.success(ctx, result);
  }
}

module.exports = HomeController;