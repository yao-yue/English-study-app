'use strict'
const Controller = require('egg').Controller

class WriteQuestionController extends Controller {
    //获取写作真题列表
    async getWriteQuestionList() {
        const wqList = await this.app.mysql.query(`select * from write_questions`)
        this.ctx.body = {code:200, wqList}
    }
    //添加写作真题
    async addWriteQuestion() {
        const wq = this.ctx.request.body
        const setResult = await this.app.mysql.insert('write_questions', wq)
        if(setResult.affectedRows > 0) {
            this.ctx.body = { 
                code: 200,
                msg: 'insert success'
            }
        }
    }
    //编辑修改写作真题
    async editWriteQuestionById() {
        const id = this.ctx.params.id || -1
        const wq = this.ctx.request.body 
        const row = {
            id,
            ...wq
        }
        const result = await this.app.mysql.update('write_questions', row)
        if (result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'update success' }
        } else {
            this.ctx.body = { status: 404, msg: 'update fail' }
        }
    }
    //删除写作真题
    async deleteWriteQuestionById() {
        const id = this.ctx.params.id || -1
        if(id === -1) {
            this.ctx.body = { status: 404, msg: '资源不存在' }
            return 
        }
        const result = await this.app.mysql.delete('write_questions', { id })
        if (result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'delete success' }
        } else {
            this.ctx.body = { status: 404, msg: '资源不存在' }
        }
    }
    //根据类型查询写作真题 //还有一些别的类型要查询  这个接口经过改良可以通过年份 主题 类型来查询
    async searchWriteQuestionByType() {
        const {type, sourceTime, topic} = this.ctx.query 
        if (type) {
            const result = await this.app.mysql.select('write_questions', {
                where: { type },
            })
            if (result.length != 0) {
                this.ctx.body = { status: 200, data: result }
            } else {
                this.ctx.body = { status: 404, msg: '没有这个资源' }
            }
        }else if(sourceTime) {
            const result = await this.app.mysql.select('write_questions', {
                where: { sourceTime },
            })
            if (result.length != 0) {
                this.ctx.body = { status: 200, data: result }
            } else {
                this.ctx.body = { status: 404, msg: '没有这个资源' }
            }
        } else if(topic) {
            const result = await this.app.mysql.select('write_questions', {
                where: { topic },
            })
            if (result.length != 0) {
                this.ctx.body = { status: 200, data: result }
            } else {
                this.ctx.body = { status: 404, msg: '没有这个资源' }
            }
        }
        else {
            this.ctx.body = { status: 403, msg: '传参不正确' }
        }
    }
    
}

module.exports = WriteQuestionController