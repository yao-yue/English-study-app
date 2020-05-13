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
  router.post('/upload', controller.upload.putf);
  router.get('/test', controller.upload.test)
  router.get('/listBuckets',controller.upload.listBuckets)


  require('./router/default')(app)
  require('./router/admin')(app)
};
