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
    const result = new ctx.model.Carousel(ctx.request.body);
    await result.save();
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
    const image = ctx.request.body.image;
    const result = await ctx.model.Carousel.findById(_id);
    if (result.image !== image) {
      await service.tools.deleteFile(result.image);
    }
    await ctx.model.Carousel.updateOne({ "_id": _id }, ctx.request.body);
    ctx.helper.noContent(ctx);
  }

  async find () {
    const { ctx } = this;
    const _id = ctx.params._id;
    const result = await ctx.model.Carousel.findById(_id);
    ctx.helper.success(ctx, result);
  }
}

module.exports = CarouselController;