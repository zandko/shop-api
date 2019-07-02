'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 图片上传
  router.post('/api/v1/common/upload', controller.common.uploader.uploadPhoto);
  router.post('/api/v1/common/batch_upload', controller.common.uploader.batchUploadPhoto);

};
