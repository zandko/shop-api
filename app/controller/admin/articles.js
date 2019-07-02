'use strict';

const Controller = require('egg').Controller;

class AdsController extends Controller {
  // 文章列表
  async index () {
    const { ctx, app } = this;

    const page = Number(ctx.request.query.page) || 1;
    const pageSize = Number(ctx.request.query.pageSize) || 20;
    const total = await ctx.model.Article.find({}).count();
    const data = await ctx.model.Article.find({}).sort({ "_id": -1 }).skip((page - 1) * pageSize).limit(pageSize)

    ctx.helper.success(ctx, {
      data,
      page,
      total
    })
  }

  // 添加文章
  async store () {
    const { ctx } = this;

    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const cat_id = ctx.request.body.cat_id;
    const link = ctx.request.body.link ? ctx.request.body.link : null;
    const result = await ctx.model.Article.create({ title, content, cat_id, link });

    ctx.helper.created(ctx, result);
  }

  // 删除文章
  async destroy () {
    const { ctx } = this;

    const _id = ctx.params._id;
    await ctx.model.Article.deleteOne({ "_id": _id });

    ctx.helper.noContent(ctx);
  }

  // 修改文章
  async update () {
    const { ctx } = this;
   
    const _id = ctx.params._id;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const cat_id = ctx.request.body.cat_id;
    const link = ctx.request.body.link ? ctx.request.body.link : null;
    const sort_num = ctx.request.body.sort_num;
    if (sort_num) {
      var result = await ctx.model.Article.updateOne({ "_id": _id }, { title, content, cat_id, link, sort_num });
    } else {
      var result = await ctx.model.Article.updateOne({ "_id": _id }, { title, content, cat_id, link });
    }

    ctx.helper.noContent(ctx, result);
  }

  async find () {
    const { ctx } = this;
   
    const _id = ctx.params._id;
   
    var result = await ctx.model.Article.findById(_id);

    ctx.helper.success(ctx, result);
  }
}

module.exports = AdsController;
