'use strict';

/** @type Egg.EggPlugin */

// 配置egg-jwt
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};

// 配置mongodb
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};