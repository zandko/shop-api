'use strict';

const Controller = require('egg').Controller;

class CarouselController extends Controller {
  async index () {
    const { ctx } = this;
    const result = await ctx.model.Carousel.find();
    ctx.helper.success(ctx, result);
  }

  async store () {
    const { ctx } = this;
    const carousel = {
      title: ctx.request.body.title,
      image: ctx.request.body.image,
      link: ctx.request.body.link,
      sort: ctx.request.body.sort,
      is_enable: ctx.request.body.is_enable
    }
    const result = await ctx.model.Carousel.create(carousel);
    ctx.helper.created(ctx, result);
  }

  async destroy () {
    const { ctx, service } = this;
    const _id = ctx.params._id;
    const result = await ctx.model.Carousel.findById(_id);
    if (result.image) {
      await service.tools.deleteFile(result.image);
    }
    await ctx.model.Carousel.deleteOne({ "_id": _id });
    ctx.helper.noContent(ctx);
  }

  async update () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const carousel = {
      title: ctx.request.body.title,
      image: ctx.request.body.image,
      link: ctx.request.body.link,
      sort: ctx.request.body.sort,
      is_enable: ctx.request.body.is_enable
    }
    const result = await ctx.model.Carousel.findById(_id);
    if (result.image !== carousel.image) {
      await service.tools.deleteFile(result.image);
    }
    await ctx.model.Carousel.updateOne({ "_id": _id }, carousel);
    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const result = await ctx.model.Carousel.findById(_id);
    if (result) {
      ctx.helper.success(ctx, result);
    } else {
      ctx.helper.error(ctx, 404, '资源不存在');
    }
  }
}

module.exports = CarouselController;