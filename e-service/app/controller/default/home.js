'use strict'
const Controller = require('egg').Controller
let OSS = require('ali-oss')
const fs = require('mz/fs');
const client = new OSS({
    bucket: 'en-source',
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4G9RKoGn14ht7Y4eDWLE',
    accessKeySecret: '7UzJ1p2YhKTpCxXAOpB9Z3yaNbpwFR'
})

class DefaultController extends Controller {
    //测试用
    async index() {
        this.ctx.body = { msg: 'test success, this is app index'}
    }

    //获取首页轮播图
    async getCarousel() {
        let result = await client.list({
            prefix: 'carousel/'
          });
        //获取获取文件的链接
        const objects = result.objects?result.objects:[]
        if(objects.length === 0) {
            this.ctx.body = {
                code: 200,
                data: {
                    list: [],
                    msg: '没有数据'
                }
            }
            return 
        }
        const list = objects.map(item => {
            return client.signatureUrl(item.name, {
                expires: 3600,
                // process: 'image/resize,w_200'   不要压缩
            })
        })
        this.ctx.body = {
            code: 200,
            data: {
                list,
                msg: '获取成功'
            }
        }
    }
    //获取单词
    async getWordList() {
        const wordList = await this.app.mysql.query(`select * from words`)
        if (wordList.length > 0) {
            this.ctx.body = { status: 200, wordList }
        } else {
            this.ctx.body = { status: 404, msg: '请求的资源不存在' }
        }
    }
    //生成定制单词

    //获取视频列表
    async getVideoList() {
        this.ctx.body = { msg: '获取视频列表'}
        const videoList = await this.app.mysql.query(`select * from videos`)
        if (videoList.length > 0) {
            videoList.map(item => {
                item.file = client.signatureUrl('video/'+item.file, {
                    expires: 3600,
                })
                item.showImg = client.signatureUrl('videoImg/'+item.showImg, {
                    expires: 3600,
                })
            })
            this.ctx.body = { status: 200, videoList }
        } else {
            this.ctx.body = { status: 404, msg: '请求的资源不存在' }
        }
    }
    //获取作文真题
    async getWriteQuestionList() {
        const wqList = await this.app.mysql.query(`select * from write_questions`)
        this.ctx.body = {code:200, wqList}
    }
    //获取作文指南
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
    //用户听力训练

    //用户作文训练
}

module.exports = DefaultController