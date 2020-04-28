'use strict'
const Controller = require('egg').Controller

class WriteQuestionController extends Controller {
    //获取写作真题列表
    async getWriteQuestionList() {
        this.ctx.body = { msg: 'test success'}
    }
    //添加写作真题
    async addWriteQuestion() {
        this.ctx.body = { msg: 'test success'}
    }
    //编辑修改写作真题
    async editWriteQuestionById() {
        this.ctx.body = { msg: 'test success'}
    }
    //删除写作真题
    async deleteWriteQuestionById() {
        this.ctx.body = { msg: 'test success'}
    }
    //根据类型查询写作真题 //还有一些别的类型要查询
    async searchWriteQuestionByType() {
        this.ctx.body = { msg: 'test success'}
    }
}

module.exports = WriteQuestionController