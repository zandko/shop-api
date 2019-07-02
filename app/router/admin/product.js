'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 产品类型
  router.get('/api/v1/admin/product_type', controller.admin.productType.index);
  router.get('/api/v1/admin/product_type/:_id', controller.admin.productType.find);
  router.post('/api/v1/admin/product_type', controller.admin.productType.store);
  router.del('/api/v1/admin/product_type/:_id', controller.admin.productType.destroy);
  router.put('/api/v1/admin/product_type/:_id', controller.admin.productType.update);

  // 产品类型属性
  router.get('/api/v1/admin/product_type_attributes/:_id', controller.admin.productTypeAttribute.index);
  router.get('/api/v1/admin/product_type_attribute/:_id', controller.admin.productTypeAttribute.find);
  router.post('/api/v1/admin/product_type_attribute', controller.admin.productTypeAttribute.store);
  router.del('/api/v1/admin/product_type_attribute/:_id', controller.admin.productTypeAttribute.destroy);
  router.put('/api/v1/admin/product_type_attribute/:_id', controller.admin.productTypeAttribute.update);

  // 产品分类
  router.get('/api/v1/admin/product_category', controller.admin.productCategory.index);
  router.get('/api/v1/admin/product_category/:_id', controller.admin.productCategory.find);
  router.post('/api/v1/admin/product_category', controller.admin.productCategory.store);
  router.del('/api/v1/admin/product_category/:_id', controller.admin.productCategory.destroy);
  router.put('/api/v1/admin/product_category/:_id', controller.admin.productCategory.update);

  // 产品颜色
  router.get('/api/v1/admin/product_color', controller.admin.productColor.index);
  router.get('/api/v1/admin/product_color/:_id', controller.admin.productColor.find);
  router.post('/api/v1/admin/product_color', controller.admin.productColor.store);
  router.del('/api/v1/admin/product_color/:_id', controller.admin.productColor.destroy);
  router.put('/api/v1/admin/product_color/:_id', controller.admin.productColor.update);

  // 产品管理
  router.get('/api/v1/admin/product', controller.admin.product.index);
  router.get('/api/v1/admin/product/:_id', controller.admin.product.find);
  router.post('/api/v1/admin/product', controller.admin.product.store);
  router.del('/api/v1/admin/product/:_id', controller.admin.product.destroy);
  router.put('/api/v1/admin/product/:_id', controller.admin.product.update);

  // 产品图片
  router.post('/api/v1/admin/product_picture', controller.admin.productImage.store);
  router.del('/api/v1/admin/product_picture/:_id', controller.admin.productImage.destroy);
  router.put('/api/v1/admin/product_picture/:_id', controller.admin.productImage.update);
};
