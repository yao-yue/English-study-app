'use strict'
const Controller = require('egg').Controller

class MainController extends Controller {
    async checkLogin() {
        let { username, password } = this.ctx.request.body
        // const username = 'boss', password = '112233'
        const sql = " SELECT id FROM admin_user WHERE username = '" + username +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            this.ctx.body = { status: '1', msg: 'success' }
        } else {
            this.ctx.body = { status: '0', msg: '用户名或者密码错误' }
        }
    }
  
}

module.exports = MainController