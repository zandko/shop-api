'use strict';

const Controller = require('egg').Controller;

class AdsController extends Controller {
  // 文章列表
  async index() {
    const {ctx, app} = this;
    let order = ctx.query.order;
    let _id = ctx.query.cat_id;
    let cat_id = app.mongoose.Types.ObjectId(_id);
    let page = ctx.query.page ? Number(ctx.query.page) : 1;
    let per_page = ctx.query.per_page ? Number(ctx.query.per_page) : 10;

    console.log( typeof  page);
    if (order === 'desc') {
      order = -1;
    } else {
      order = 1;
    }
    const result = await ctx.model.Article.aggregate([
      {
        $lookup: {
          from: 'articlecats',
          localField: "cat_id",
          foreignField: "_id",
          as: "items"
        }
      },
      {
        $match: {"cat_id": cat_id}  // 条件
      },
      {
        $sort: {"sort_num": order} // 排序
      },
      {
        $skip: page   // 第几页开始
      },
      {
        $limit: per_page // 一页几条
      },
    ]);
    ctx.helper.success(ctx, result);
  }

  // 添加文章
  async store() {
    const {ctx} = this;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const cat_id = ctx.request.body.cat_id;
    const link = ctx.request.body.link ? ctx.request.body.link : null;
    const result = await ctx.model.Article.create({title, content, cat_id, link});
    ctx.helper.created(ctx, result);
  }

  // 删除文章
  async destroy() {
    const {ctx} = this;
    const _id = ctx.params._id;
    await ctx.model.Article.deleteOne({"_id": _id});
    ctx.helper.noContent(ctx);
  }

  // 修改文章
  async update() {
    const {ctx} = this;
    const _id = ctx.params._id;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const cat_id = ctx.request.body.cat_id;
    const link = ctx.request.body.link ? ctx.request.body.link : null;
    const sort_num = ctx.request.body.sort_num;
    if (sort_num) {
      var result = await ctx.model.Article.updateOne({"_id": _id}, {title, content, cat_id, link, sort_num});
    } else {
      var result = await ctx.model.Article.updateOne({"_id": _id}, {title, content, cat_id, link});
    }
    ctx.helper.noContent(ctx, result);
  }
}

module.exports = AdsController;
