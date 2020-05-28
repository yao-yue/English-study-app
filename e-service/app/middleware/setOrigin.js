/**
   【自定义允许跨域】：Access-Control-Allow-Origin
 */
'use strict';

module.exports = options => {
    //获取config.default.js的配置
  const { whiteList } = options;
  /**
     * 如果传入的不是数组，直接抛出错误
     *  */
  if (!Array.isArray(whiteList)) {
    throw Error('---------跨域白名单必须设置为数组----------');
  }

  return async function setOrigin(ctx, next) {
    console.log('这个中间件配置没有出问题')
    // 当前访问的域名
    const { origin } = ctx.request.header;
    // 如果设置成 '*'，就给访问的域名设置允许跨域
    if (whiteList.indexOf('*') > -1) {
      ctx.response.set('Access-Control-Allow-Origin', origin);
    } else if (whiteList.indexOf(origin) > -1) {
      ctx.response.set('Access-Control-Allow-Origin', origin);
    }
    await next();
  };
};