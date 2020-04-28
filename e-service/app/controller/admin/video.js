'use strict'
const Controller = require('egg').Controller

class VideoController extends Controller {
    //获取视频列表
    async getVideoList() {
        this.ctx.body = { msg: '获取视频列表'}
    }

    //添加视频
    async addVideo() {
        this.ctx.body = { msg: '添加视频'}
    }  
    
    //对某个视频进行编辑
    async editVideoById() {
        //获取传过来的单词id、及相关的数据，进行存储
        this.ctx.body = { msg: '编辑视频'}
    }

    //删除某个视频
    async deleteVideoById() {
        //获取传过来的视频id,删除这个视频
        this.ctx.body = { msg: '通过id删除视频'}
    }

    //根据视频类别进行查询视频 // 一个下拉框选择需要的视频类型
    async searchVideoByType() {
        //获取传过来的视频类型，进行查询
        this.ctx.body = { msg: '根据穿过来的视频类型来进行查询视频'}
    }
}

module.exports = VideoController