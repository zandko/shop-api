'use strict';

const Controller = require('egg').Controller;

class ArticleCategoryController extends Controller {
  // 文章分类列表
  async index () {
    const { ctx } = this;
   
    const result = await ctx.model.ArticleCategory.find({}).sort({ "_id": -1 });
    ctx.helper.success(ctx, result);
  }

  // 添加文章分类
  async store () {
    const { ctx } = this;
    const cat_name = ctx.request.body.cat_name;
    console.log(ctx.request.body)
    const result = await ctx.model.ArticleCategory.create({ cat_name });
    ctx.helper.created(ctx, result);
  }

  // 删除文章分类
  async destroy () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.ArticleCategory.deleteOne({ "_id": _id });
    await ctx.model.Article.deleteMany({ "cat_id": _id });  // 文章分类没了 他下面的文章也会被删除
    ctx.helper.noContent(ctx);
  }

  // 修改文章分类
  async update () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const cat_name = ctx.request.body.cat_name;
    const result = await ctx.model.ArticleCategory.updateOne({ "_id": _id }, { cat_name });
    ctx.helper.noContent(ctx, result);
  }
}

module.exports = ArticleCategoryController;
