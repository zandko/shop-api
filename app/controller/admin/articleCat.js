'use strict';

const Controller = require('egg').Controller;

class AdsController extends Controller {
  // 文章分类列表
  async index() {
    const {ctx} = this;
    let order = ctx.query.order;
    let page = ctx.query.page ? Number(ctx.query.page) : 1;
    let per_page = ctx.query.per_page ? Number(ctx.query.per_page) : 10;

    if (order === 'desc') {
      order = -1;
    } else {
      order = 1;
    }

    const result = await ctx.model.ArticleCat.find({}).sort({"_id": order}).skip(page).limit(per_page);
    ctx.helper.success(ctx, result);
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
    await ctx.model.Article.deleteMany({"cat_id": _id});  // 文章分类没了 他下面的文章也会被删除
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
