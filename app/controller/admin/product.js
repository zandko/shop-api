'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index () {

  }

  async store () {
    const { ctx } = this;

    const productResult = ctx.model.Product(ctx.request.body)
    await productResult.save();
    const productImageResult = ctx.request.body.image_url;
    const productAttributeResult = ctx.request.body.attr_value;
    if(productResult._id) {
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
    }
  }

  async destroy () {
    
  }

  async update () {

  }

  async find () {

  }

  /*
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
  */
}

module.exports = ProductController;
