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

//首页轮播图
class CarouselController extends Controller {
    //获取首页轮播图
    async getCarousel() {
        let result = await client.list({
            prefix: 'carousel/'
          });
        //获取获取文件的链接
        const list = result.objects.map(item => {
            return client.signatureUrl(item.name, {
                expires: 3600,
                process: 'image/resize,w_200'
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
    //添加首页轮播图
    async addCarousel() {
        const imgFile = this.ctx.request.files[0];    //获取的图片文件
        const suffix = imgFile.filename.replace(/[^\.]\w*/, '')
        const time = new Date()
        const filename = time.getTime().toString() + parseInt(Math.random() * 9999) + suffix
        try {
            let result = await client.put('carousel/' + filename, imgFile.filepath);
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
            await fs.unlink(imgFile.filepath);
        }
    }
    //删除首页轮播图
    async deleteCarouselByName() {
        const filename =   this.ctx.query.filename || ''
        const result = await client.delete('carousel/'+ filename);
        this.ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    }
    //感觉可以不必做修改，因为不是啥复杂的东西
}

module.exports = CarouselController