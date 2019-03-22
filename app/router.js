'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app;
  // Admin  后台管理
  // 登录
  router.post('/api/v1/admin/authentication', controller.admin.login.authentication);
  // 测试
  router.get('/api/v1/admin/gettoken', controller.admin.login.gettoken);

  // 角色管理
  router.get('/api/v1/admin/roles', controller.admin.roles.index);
  router.post('/api/v1/admin/roles', controller.admin.roles.store);
  router.del('/api/v1/admin/roles/:_id', controller.admin.roles.destroy);
  router.put('/api/v1/admin/roles/:_id', controller.admin.roles.update);
  router.get('/api/v1/admin/roles/:_id', controller.admin.roles.show);

  // 管理员管理
  router.get('/api/v1/admin/administrators', controller.admin.administrators.index);
  router.post('/api/v1/admin/administrators', controller.admin.administrators.store);
  router.del('/api/v1/admin/administrators/:_id', controller.admin.administrators.destroy);
  router.put('/api/v1/admin/administrators/:_id', controller.admin.administrators.update);
  router.get('/api/v1/admin/administrators/:_id', controller.admin.administrators.show);

  // Index  前台管理

};
