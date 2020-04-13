config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*']
};
config.cors = {
    origin: 'http://182.92.184.154',
    credentials: true,  //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};