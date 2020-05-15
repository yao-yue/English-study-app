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
    //添加首页轮播图
    async addCarousel() {
        //数量校验，如果不通过就拒绝添加
        let carousel = await client.list({
            prefix: 'carousel/'
          });
          const carouselCount = carousel.objects ? carousel.objects.length : -1
        if(carouselCount !== -1 && carouselCount >= 5) {
            this.ctx.body = {
                code: 403,
                msg: '首页轮播图最大上限为5张，若要新增请删除之前的图片'
            }
            return
        }
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
        const {filename} =  this.ctx.query
        if(!filename) {
            this.ctx.body = {
                code: 403,
                msg: '传参未接收到'
            }
            return
        }
        const result = await client.delete('carousel/'+ filename);
        this.ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    }
    //感觉可以不必做修改，因为不是啥复杂的东西
}

module.exports = CarouselController