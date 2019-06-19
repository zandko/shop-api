'use strict';

const Controller = require('egg').Controller;

class CarouselController extends Controller {
  async index () {
    const { ctx } = this;
    const resutl = await ctx.model.Carousel.find();
    ctx.helper.success(ctx, resutl);
  }

  async store () {
    const { ctx } = this;
    const carousel = {
      title: ctx.request.body.title,
      image_url: ctx.request.body.iamge_url,
      link_url: ctx.request.body.link_url,
      sort: ctx.request.body.sort,
      is_enable: ctx.request.body.is_enable
    }
    const result = await ctx.model.Carousel.create(carousel);
    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx } = this;
    const _id = ctx.params._id;
    await ctx.model.Carousel.deleteOne({ "_id": _id });
    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const carousel = {
      title: ctx.request.body.title,
      image_url: ctx.request.body.iamge_url,
      link_url: ctx.request.body.link_url,
      sort: ctx.request.body.sort,
      is_enable: ctx.request.body.is_enable
    }
    await ctx.model.Carousel.updateOne({ "_id": _id }, carousel);
    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const resutl = await ctx.model.Carousel.findById(_id);
    if (resutl) {
      ctx.helper.success(ctx, resutl);
    } else {
      ctx.helper.error(ctx, 404, '资源不存在');
    }
  }
}

module.exports = CarouselController;