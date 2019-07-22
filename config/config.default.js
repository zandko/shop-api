/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.uploadDir = 'app/public/upload/'
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553171259992_1829';

  // add your middleware config here
  config.middleware = ['adminauth'];
  config.adminauth = {
    match: '/api/v1/',
  }

  // 配置JWT
  config.jwt = {
    secret: "123456"
  };

  // 配置mongodb
  config.mongoose = {
    client: {
      url: mg,
      options: {}
    }
  }

  // 让csrf失效
  config.security = {
    csrf: {
      enable: false
    }
  }

  config.cors = {
    origin: ['http://localhost:9527']
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
