'use strict'
const Controller = require('egg').Controller

class DefaultController extends Controller {
    //测试用
    async index() {
        this.ctx.body = { msg: 'test success, this is app index'}
    }

    //获取首页轮播图
    
    //获取单词

    //生成定制单词

    //获取视频列表

    //获取作文真题

    //获取作文指南

    //用户听力训练

    //用户作文训练
}

module.exports = DefaultController