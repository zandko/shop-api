'use strict';

const Controller = require('egg').Controller;
const pump = require('mz-modules').pump;
const fs = require('fs');

class UploaderController extends Controller {
  async uploadPhoto () {
    const { ctx, service } = this;
  
    const stream = await ctx.getFileStream();
    const dir = await service.tools.getUploadFile(stream.filename);
    const target = dir.uploadDir;
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    service.tools.jimpImg(target);

    ctx.body = {
      url: 'http://127.0.0.1:7001' + dir.saveDir
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
      service.tools.jimpImg(target);
      uploadArr.push(files)
    }
    ctx.body = { data: uploadArr };
  }
}

module.exports = UploaderController;