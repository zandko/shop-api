'use strict';

const Controller = require('egg').Controller;
const pump = require('mz-modules').pump;
const path = require('path');
const fs = require('fs');

class UploaderController extends Controller {
  async index () {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const dir = await this.service.tools.getUploadFile(stream.filename);
    const target = dir.uploadDir;
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);

    ctx.status = 201;
    ctx.body = {
      url: dir.saveDir
    };
  }
}

module.exports = UploaderController;