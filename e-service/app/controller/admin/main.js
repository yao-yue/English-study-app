'use strict'
const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        //首页文章列表数据
        this.ctx.body = 'test index is no problem!'
    }
    async checkLogin() {
        // let { username, password } = this.ctx.request.body
        const username = 'boss', password = '112233'
        const sql = " SELECT id FROM admin_user WHERE username = '" + username +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            this.ctx.body = { status: '1', msg: 'success' }
        } else {
            this.ctx.body = { status: '0', msg: 'logining fail' }
        }
    }
  
}

module.exports = MainController