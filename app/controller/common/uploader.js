'use strict';

const Controller = require('egg').Controller;
const pump = require('mz-modules').pump;
const fs = require('fs');

class UploaderController extends Controller {
  async uploadPhoto () {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const dir = await this.service.tools.getUploadFile(stream.filename);
    const target = dir.uploadDir;
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);

    ctx.body = {
      url: dir.saveDir
    };
  }

  async batchUploadPhoto () {
    const { ctx, service } = this;
    const parts = ctx.multipart();
    let files = {};
    let uploadArr = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname;
      const dir = await service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      })
      uploadArr.push(files)
    }
    ctx.body = { data: uploadArr };
  }
}

module.exports = UploaderController;