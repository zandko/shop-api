'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const sd = require('silly-datetime');
const mkdirp = require('mz-modules').mkdirp;
const path = require('path');
const fs = require('fs');
class ToolsService extends Service {
  /**
   * 生成 Token
   * @param data {Object}
   * @returns {number | PromiseLike<ArrayBuffer>}
   */
  async createToken (data) {
    const { ctx } = this;
    return ctx.app.jwt.sign(data, ctx.app.jwt.secret, {
      expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
    });
  }

  /**
   * 验证 Token
   * @param {String} token 
   */
  async verifyToken (token) {
    const { ctx } = this;
    return new Promise((resolve, reject) => {
      ctx.app.jwt.verify(token, ctx.app.config.jwt.secret, function (err, decoded) {
        let result = {};
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }

  /**
   * md5 加密
   * @param {String} str 
   */
  async md5 (str) {
    return md5(str);
  }

  /**
   * 返回一个时间的格林威治时间数值
   */
  async getTime () {
    var d = new Date();
    return d.getTime();
  }

  /**
   * 获取指定字符后面的所有字符内容
   * @param {*} obj 
   */
  async getCaption (obj) {
    var index = obj.lastIndexOf("\/");
    obj = obj.substring(index + 1, obj.length);
    return obj;
  }

  /**
   * 创建图片目录并返回保存的路径
   * @param {*} fileName 
   */
  async getUploadFile (fileName) {
    const { config, service } = this;
    const day = sd.format(new Date(), "YYYYMMDD");
    const dir = path.join(config.uploadDir, day);
    await mkdirp(dir);

    const d = await service.tools.getTime();
    const uploadDir = path.join(dir, d + path.extname(fileName));

    return {
      uploadDir: uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/')
    }
  }

  /**
   * 删除文件
   * @param {*} path 
   */
  async deleteFile (path) {
    fs.unlink('app' + path);
  }
}

module.exports = ToolsService;