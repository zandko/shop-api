'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 注册、登录
  router.post('/api/v1/home/members', controller.home.member.store);
  router.post('/api/v1/home/authorizations', controller.home.authorizations.store);

};
