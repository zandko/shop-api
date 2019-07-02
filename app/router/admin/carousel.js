'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 轮播图管理
  router.get('/api/v1/admin/carousel', controller.admin.carousel.index);
  router.get('/api/v1/admin/carousel/:_id', controller.admin.carousel.find);
  router.post('/api/v1/admin/carousel', controller.admin.carousel.store);
  router.del('/api/v1/admin/carousel/:_id', controller.admin.carousel.destroy);
  router.put('/api/v1/admin/carousel/:_id', controller.admin.carousel.update);
};
