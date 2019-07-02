'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 广告位
  router.get('/api/v1/admin/ad_pos', controller.admin.adPos.index);
  router.post('/api/v1/admin/ad_pos', controller.admin.adPos.store);
  router.del('/api/v1/admin/ad_pos/:_id', controller.admin.adPos.destroy);
  router.put('/api/v1/admin/ad_pos/:_id', controller.admin.adPos.update);
  
  // 广告
  router.get('/api/v1/admin/ads', controller.admin.ads.index);
  router.post('/api/v1/admin/ads', controller.admin.ads.store);
  router.del('/api/v1/admin/ads/:_id', controller.admin.ads.destroy);
  router.put('/api/v1/admin/ads/:_id', controller.admin.ads.update);
};
