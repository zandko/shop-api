'use strict';

const Controller = require('egg').Controller;

class CategorysController extends Controller {
  async index () {
    const { ctx } = this;
  }
  async store () {
    const { ctx } = this;
    const name = ctx.request.body.name;
    const isName = await ctx.model.Category.find({ "name": name });
    if (!isName[0]) {
      const result = await ctx.model.Category.create({ name });
      if (result) {
        ctx.helper.created(ctx, result);
      }
    } else {
      ctx.helper.error(ctx, 422, "分类名称已存在");
    }
  }
  async destroy () {
    const { ctx } = this;
    const category_id = ctx.params._id;
    await ctx.model.Category.deleteOne({ "_id": category_id });
    ctx.helper.noContent(ctx);
  }
  async update () {
    const { ctx, service } = this;
    const category_id = ctx.params._id;
    const name = ctx.request.body.name;
    await ctx.model.Category.updateOne({ "_id": category_id }, { "name": name });
    ctx.helper.noContent(ctx);
  }
}

module.exports = CategorysController;