'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index () {
    const { ctx } = this;

    const page = Number(ctx.request.query.page) || 1;
    const pageSize = Number(ctx.request.query.pageSize) || 3;
    const total = await ctx.model.Product.find({}).count();
    const data = await ctx.model.Product.find({}).sort({ "_id": -1 }).skip((page - 1) * pageSize).limit(pageSize)

    ctx.helper.success(ctx, {
      data,
      page,
      total
    })
  }

  async store () {
    const { ctx } = this;

    const productResult = ctx.model.Product(ctx.request.body);
    await productResult.save();
    const productImageResult = ctx.request.body.image_url;
    const productAttributeResult = ctx.request.body.attr_value;
    if (productResult._id) {
      if (productImageResult.length > 0) {
        for (let index = 0; index < productImageResult.length; index++) {
          await ctx.model.ProductImage.create({ "product_id": productResult._id, "url": productImageResult[index] });
        }
      }
      if (productAttributeResult.length > 0) {
        for (let index = 0; index < productAttributeResult.length; index++) {
          const productAttribute = await ctx.model.ProductTypeAttribute.find({
            "_id": productAttributeResult[index]._id,
          });
          await ctx.model.ProductAttribute.create({
            "product_id": productResult._id,
            "product_type_id": ctx.request.body.product_type_id,
            "product_category_id": ctx.request.body.product_category_id,
            "title": productAttribute[0].title,
            "type": productAttribute[0].attr_type,
            "value": productAttributeResult[index].attr_value
          });
        }
      }

      ctx.helper.created(ctx, productResult);
    }
  }

  async destroy () {
    const { ctx } = this;

    const _id = ctx.params._id;
    ctx.model.Product.deleteOne({ "_id": _id });
    ctx.model.ProductImage.deleteMany({ "product_id": _id });
    ctx.model.ProductAttribute.deleteMany({ "product_id": _id });

    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;

    const _id = ctx.params._id;
    const productResult = await ctx.model.Product.update({ "_id": _id }, ctx.request.body);
    ctx.model.ProductImage.deleteMany({ "product_id": _id });
    ctx.model.ProductAttribute.deleteMany({ "product_id": _id });
    const productImageResult = ctx.request.body.image_url;
    const productAttributeResult = ctx.request.body.attr_value;

    if (productImageResult.length > 0) {
      for (let index = 0; index < productImageResult.length; index++) {
        await ctx.model.ProductImage.create({ "product_id": productResult._id, "url": productImageResult[index] });
      }
    }
    if (productAttributeResult.length > 0) {
      for (let index = 0; index < productAttributeResult.length; index++) {
        const productAttribute = await ctx.model.ProductTypeAttribute.find({
          "_id": productAttributeResult[index]._id,
        });
        await ctx.model.ProductAttribute.create({
          "product_id": productResult._id,
          "product_type_id": ctx.request.body.product_type_id,
          "product_category_id": ctx.request.body.product_category_id,
          "title": productAttribute[0].title,
          "type": productAttribute[0].attr_type,
          "value": productAttributeResult[index].attr_value
        });
      }
    }

    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;

    const _id = ctx.params._id;
    const productResult = await ctx.model.Product.findById(_id);
    const productImage = await ctx.model.ProductImage.find({ "product_id": productResult._id });
    const productAttribute = await ctx.model.ProductAttribute.find({ "product_id": productResult._id });

    ctx.helper.success(ctx, {
      productResult,
      productImage,
      productAttribute
    });
  }
}

module.exports = ProductController;
