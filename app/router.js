'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // Admin  后台管理
  // 登录
  router.post('/api/v1/admin/authentications', controller.admin.login.authentication);

  // 角色管理
  router.get('/api/v1/admin/roles', controller.admin.roles.index);
  router.post('/api/v1/admin/roles', controller.admin.roles.store);
  router.del('/api/v1/admin/roles/:_id', controller.admin.roles.destroy);
  router.put('/api/v1/admin/roles/:_id', controller.admin.roles.update);

  // 管理员管理
  router.get('/api/v1/admin/administrators', controller.admin.administrators.index);
  router.post('/api/v1/admin/administrators', controller.admin.administrators.store);
  router.del('/api/v1/admin/administrators/:_id', controller.admin.administrators.destroy);
  router.put('/api/v1/admin/administrators/:_id', controller.admin.administrators.update);

  // 权限管理
  router.get('/api/v1/admin/privileges', controller.admin.privileges.index);
  router.post('/api/v1/admin/privileges', controller.admin.privileges.store);
  router.del('/api/v1/admin/privileges/:_id', controller.admin.privileges.destroy);
  router.put('/api/v1/admin/privileges/:_id', controller.admin.privileges.update);

  // 广告管理
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

  // 文章管理
  // 文章分类
  router.get('/api/v1/admin/article_categories', controller.admin.articleCat.index);
  router.post('/api/v1/admin/article_categories', controller.admin.articleCat.store);
  router.del('/api/v1/admin/article_categories/:_id', controller.admin.articleCat.destroy);
  router.put('/api/v1/admin/article_categories/:_id', controller.admin.articleCat.update);
  // 文章
  router.get('/api/v1/admin/articles', controller.admin.articles.index);
  router.post('/api/v1/admin/articles', controller.admin.articles.store);
  router.del('/api/v1/admin/articles/:_id', controller.admin.articles.destroy);
  router.put('/api/v1/admin/articles/:_id', controller.admin.articles.update);

  // Index  前台管理
  // 注册、登录
  router.post('/api/v1/home/members', controller.home.member.store);
  router.post('/api/v1/home/authorizations', controller.home.authorizations.store);
};
