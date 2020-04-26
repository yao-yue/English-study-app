'use strict'
const Controller = require('egg').Controller

class DefaultController extends Controller {
    async index() {
        //首页文章列表数据
        this.ctx.body = 'this is 客户端的首页测试'
    }
  
}

module.exports = DefaultController