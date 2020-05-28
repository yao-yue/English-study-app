'use strict'
const Controller = require('egg').Controller
const fs = require('mz/fs');
let OSS = require('ali-oss')
const client = new OSS({
    bucket: 'en-source',
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4G9RKoGn14ht7Y4eDWLE',
    accessKeySecret: '7UzJ1p2YhKTpCxXAOpB9Z3yaNbpwFR'
})
class VideoController extends Controller {
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
    //上传视频
    async uploadVideo() {
        //上传到阿里云oss,  数据库里面存得是文件名，到时候取出再通过文件名获得临时url
        const videoFile = this.ctx.request.files[0];    //获取的视频文件
        const suffix = videoFile.filename.replace(/[^\.]\w*/, '')
        const time = new Date()
        const filename = time.getTime().toString() + parseInt(Math.random() * 9999) + suffix
        try {
            let result = await client.put('video/' + filename, videoFile.filepath);
            if(result.res.status == 200) {
                this.ctx.body = {
                    code: 200,
                    data: {
                        filename,
                    }
                }
            }
        } finally {
            // 需要删除临时文件
            await fs.unlink(videoFile.filepath);
        }
    }
    async uploadVideoImg() {
        //上传视频介绍图片，返回文件名
        const videoImgFile = this.ctx.request.files[0];    //获取的视频介绍图文件
        const suffix = videoImgFile.filename.replace(/[^\.]\w*/, '')
        const time = new Date()
        const filename = time.getTime().toString() + parseInt(Math.random() * 9999) + suffix
        try {
            let result = await client.put('videoImg/' + filename, videoImgFile.filepath);
            if(result.res.status == 200) {
                this.ctx.body = {
                    code: 200,
                    data: {
                        filename,
                    }
                }
            }
        } finally {
            // 需要删除临时文件
            await fs.unlink(videoImgFile.filepath);
        }
    }
    // 将阿里云oss上面的有关文件删除
    async ossDelete() {
        const {type, filename} = this.ctx.query
        let result = await client.delete(type+ '/'+ filename);
        this.ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    }
    async addVideo() {
        //添加视频和上传视频不同，添加视频是把这条数据弄到数据库里面
        const videoPack = this.ctx.request.body    //获取的视频数据，然后把他们存入数据库即可
        const setResult = await this.app.mysql.insert('videos', videoPack)
        if(setResult.affectedRows > 0) {
            this.ctx.body = {
                code: 200,
                msg: '添加成功'
            }
        }else {
            this.ctx.body = {
                code: 403,
                msg: '添加失败'
            }
        }
    }  
    
    //对某个视频进行编辑
    async editVideoById() {
        //获取传过来的视频id，然后对数据进行刷新
        const videoPack = this.ctx.request.body    //获取的单词编辑数据
        const id = this.ctx.params.id
        const row = {
            id,
            ...videoPack
        }
        const result = await this.app.mysql.update('videos', row)
        if (result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'update success' }
        } else {
            this.ctx.body = { status: 404, msg: '没有此视频数据' }
        }
    }

    //数据库删除删除某个视频
    async deleteVideoById() {
        //获取传过来的视频id,删除这个视频
        const id = this.ctx.params.id
        const result = await this.app.mysql.delete('videos', { id })
        if (result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'delete success' }
        } else {
            this.ctx.body = { status: 403, msg: 'delete fail' }
        }
    }

    //根据视频类别进行查询视频 // 一个下拉框选择需要的视频类型
    async searchVideoByType() {
        //获取传过来的视频类型，进行查询
        const videoType = this.ctx.query.videoType || ''
        if (videoType) {
            const videoList = await this.app.mysql.select('videos', {
                where: { type:videoType },
            })
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
        } else {
            this.ctx.body = { status: 403, msg: '传参不正确' }
        }
    }
}

module.exports = VideoController