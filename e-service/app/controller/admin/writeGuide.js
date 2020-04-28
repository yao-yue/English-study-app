'use strict'
const Controller = require('egg').Controller

class WriteGuideController extends Controller {
    //获取写作指南列表
    async getWriteGuideList() {
        this.ctx.body = { msg: 'test success'}
    }
    //添加写作指南
    async addWriteGuide() {
        this.ctx.body = { msg: 'test success'}
    }
    //编辑写作指南
    async editWriteGuideById() {
        this.ctx.body = { msg: 'test success'}
    }
    //删除写作指南
    async deleteWriteGuideById() {
        this.ctx.body = { msg: 'test success'}
    }
}

module.exports = WriteGuideController