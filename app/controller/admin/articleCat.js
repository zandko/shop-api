'use strict';

const Controller = require('egg').Controller;

class AdsController extends Controller {
  // 文章分类列表
  async index() {
    const {ctx} = this;
    const result = await ctx.model.ArticleCat.find({});
    ctx.helper.success(ctx, result[0]);
  }

  // 添加文章分类
  async store() {
    const {ctx} = this;
    const cat_name = ctx.request.body.cat_name;
    const result = await ctx.model.ArticleCat.create({cat_name});
    ctx.helper.created(ctx, result);
  }

  // 删除文章分类
  async destroy() {
    const {ctx} = this;
    const _id = ctx.params._id;
    await ctx.model.ArticleCat.deleteOne({"_id": _id});
    ctx.helper.noContent(ctx);
  }

  // 修改文章分类
  async update() {
    const {ctx} = this;
    const _id = ctx.params._id;
    const cat_name = ctx.request.body.cat_name;
    const result = await ctx.model.ArticleCat.updateOne({"_id": _id}, {cat_name});
    ctx.helper.noContent(ctx, result);
  }
}

module.exports = AdsController;
