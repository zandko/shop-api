'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 文章分类
  router.get('/api/v1/admin/article_categories', controller.admin.articleCategory.index);
  router.post('/api/v1/admin/article_categories', controller.admin.articleCategory.store);
  router.del('/api/v1/admin/article_categories/:_id', controller.admin.articleCategory.destroy);
  router.put('/api/v1/admin/article_categories/:_id', controller.admin.articleCategory.update);
  // 文章
  router.get('/api/v1/admin/articles', controller.admin.articles.index);
  router.get('/api/v1/admin/articles/:_id', controller.admin.articles.find);
  router.post('/api/v1/admin/articles', controller.admin.articles.store);
  router.del('/api/v1/admin/articles/:_id', controller.admin.articles.destroy);
  router.put('/api/v1/admin/articles/:_id', controller.admin.articles.update);
};
