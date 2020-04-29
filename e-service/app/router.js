'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// module.exports = app => {
//   const { router, controller } = app;
//   router.get('/', controller.home.index);
// };

module.exports = app => {
  //测试文件上传
  const { router, controller } = app;
  router.post('/upload', controller.upload.upload);
  router.get('/deduplication',controller.upload.deduplication)
  router.delete('/batchDelete', controller.upload.batchDelete)

  require('./router/default')(app)
  require('./router/admin')(app)
};
