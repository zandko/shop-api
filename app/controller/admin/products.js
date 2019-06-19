'use strict';

const Controller = require('egg').Controller;

class ProductsController extends Controller {
  async index () {
    const { ctx } = this;
  }
  async store () {
    const { ctx } = this;
  }
  async destroy () {
    const { ctx } = this;
  }
  async update () {
    const { ctx } = this;
  }
}

module.exports = ProductsController;