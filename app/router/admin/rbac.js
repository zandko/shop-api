'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 登录
  router.post('/api/v1/admin/authentications', controller.admin.login.authentication);
  router.post('/api/v1/admin/logout', controller.admin.login.logout);

  // 角色管理
  router.get('/api/v1/admin/roles', controller.admin.roles.index);
  router.post('/api/v1/admin/roles', controller.admin.roles.store);
  router.del('/api/v1/admin/roles/:_id', controller.admin.roles.destroy);
  router.put('/api/v1/admin/roles/:_id', controller.admin.roles.update);

  // 管理员管理
  router.get('/api/v1/admin/administrator', controller.admin.administrators.find);
  router.get('/api/v1/admin/administrators', controller.admin.administrators.index);
  router.post('/api/v1/admin/administrators', controller.admin.administrators.store);
  router.del('/api/v1/admin/administrators/:_id', controller.admin.administrators.destroy);
  router.put('/api/v1/admin/administrators/:_id', controller.admin.administrators.update);

  // 权限管理
  router.get('/api/v1/admin/privileges', controller.admin.privileges.index);
  router.post('/api/v1/admin/privileges', controller.admin.privileges.store);
  router.del('/api/v1/admin/privileges/:_id', controller.admin.privileges.destroy);
  router.put('/api/v1/admin/privileges/:_id', controller.admin.privileges.update);
};
