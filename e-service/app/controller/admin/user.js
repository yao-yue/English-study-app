'use strict'
const Controller = require('egg').Controller


//小程序用户 
class UserController extends Controller {
    //获取视频列表
    async getUserList() {
        const sql = `select * from words`
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            this.ctx.body = { status: '200', msg: 'success',data:res }
        } else {
            this.ctx.body = { status: '401', msg: '用户名或者密码错误' }
        }
    }

    //修改用户信息 -比如编辑用户权限
    async editUserById() {
        this.ctx.body = { msg: '修改用户对象' }
    }

    //删除某个用户
    async deleteUserById() {
        this.ctx.body = { msg: '删除用户' }
    }
    //查看用户的学习记录
    //查看用户的定制单词
}

module.exports = UserController