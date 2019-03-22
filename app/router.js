'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // Admin
  router.post('/api/admin/authentication', controller.admin.login.authentication);
  router.get('/api/admin/gettoken', controller.admin.login.gettoken);


  // Index
  
};
