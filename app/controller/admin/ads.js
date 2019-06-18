'use strict';

const Controller = require('egg').Controller;

class AdsController extends Controller {
  // 广告列表
  async index () {
    const { ctx } = this;
    let order = ctx.query.order;
    let page = ctx.query.page ? Number(ctx.query.page) : 1;
    let per_page = ctx.query.per_page ? Number(ctx.query.per_page) : 10;

    if (order === 'desc') {
      order = -1;
    } else {
      order = 1;
    }
    const result = await ctx.model.Ad.aggregate([
      {
        $lookup: {
          from: 'adpos',
          localField: "pos_id",
          foreignField: "_id",
          as: "items"
        }
      },
      {
        $sort: { "_id": order } // 排序
      },
      {
        $skip: page   // 第几页开始
      },
      {
        $limit: per_page // 一页几条
      }
    ]);

    ctx.helper.success(ctx, result[0]);
  }

  // 添加广告
  async store () {
    const { ctx } = this;
    const pos_id = ctx.request.body.pos_id;
    const ad_type = ctx.request.body.ad_type;
    const content = ctx.request.body.ad_data;
    const result = await ctx.model.Ad.create({ pos_id, ad_type, content });
    ctx.helper.created(ctx, result);
  }

  // 删除广告
  async destroy () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.Ad.deleteOne({ "_id": _id });
    ctx.helper.noContent(ctx);
  }

  // 修改广告
  async update () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const pos_id = ctx.request.body.pos_id;
    const ad_type = ctx.request.body.ad_type;
    const ad_data = ctx.request.body.ad_data;
    const result = await ctx.model.Ad.updateOne({ "_id": _id }, { pos_id, ad_type, ad_data });
    ctx.helper.noContent(ctx, result);
  }
}

module.exports = AdsController;
