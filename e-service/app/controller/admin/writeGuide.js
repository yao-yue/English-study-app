'use strict'
const Controller = require('egg').Controller

class WriteGuideController extends Controller {
    //获取写作指南列表
    async getWriteGuideList() {
        const writeGuideList = await this.app.mysql.query(`select * from write_guide`)
        if (writeGuideList.length > 0) {
            writeGuideList.map(item => {
                item.basicKnowledge = item.basicKnowledge.split(',')
                item.reviewMethod = item.reviewMethod.split(',')
                item.solveSkill = item.solveSkill.split(',')
                item.actualCombatSkill = item.actualCombatSkill.split(',')
            })
            this.ctx.body = { status: 200, writeGuideList }
        } else {
            this.ctx.body = { status: 404, msg: '请求的资源不存在' }
        }
    }
    //添加写作指南
    async addWriteGuide() {
        const wg = this.ctx.request.body 
        //数据处理后存入数据库
        if(wg.basicKnowledge) {
            wg.basicKnowledge = wg.basicKnowledge.toString()
            wg.reviewMethod = wg.reviewMethod.toString()
            wg.solveSkill = wg.solveSkill.toString()
            wg.actualCombatSkill = wg.actualCombatSkill.toString()
        }else {
            this.ctx.body = { status: 404, msg: '资源不存在' }
            return 
        }
        const setResult = await this.app.mysql.insert('write_guide', wg)
        if(setResult.affectedRows > 0) {
            this.ctx.body = { 
                code: 200,
                msg: 'insert success'
            }
        }
    }
    //编辑写作指南
    async editWriteGuideById() {
        const id = this.ctx.params.id || 1
        const wg = this.ctx.request.body 
        if(wg.basicKnowledge) {
            wg.basicKnowledge = wg.basicKnowledge.toString()
            wg.reviewMethod = wg.reviewMethod.toString()
            wg.solveSkill = wg.solveSkill.toString()
            wg.actualCombatSkill = wg.actualCombatSkill.toString()
        }else {
            this.ctx.body = {code:404, msg: 'error'}
            return 
        }
        const row = {
            id,
            ...wg
        }
        const result = await this.app.mysql.update('write_guide', row)
        if (result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'update success' }
        } else {
            this.ctx.body = { status: 404, msg: '资源不存在' }
        }
    }
    //删除写作指南
    async deleteWriteGuideById() {
        const id = this.ctx.params.id || -1
        if(id === -1) {
            this.ctx.body = { status: 404, msg: '资源不存在' }
            return 
        }
        const result = await this.app.mysql.delete('write_guide', { id })
        if (result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'delete success' }
        } else {
            this.ctx.body = { status: 404, msg: '资源不存在' }
        }
    }
}

module.exports = WriteGuideController