'use strict'
const Controller = require('egg').Controller


//首页轮播图
class CarouselController extends Controller {
    //获取首页轮播图
    async getCarousel() {
        this.ctx.body = { msg: '获取首页轮播图'}
    }
    //添加首页轮播图
    async addCarousel() {
        this.ctx.body = { msg: '添加首页轮播图'}
    }
    //删除首页轮播图
    async deleteCarouselById() {
        this.ctx.body = { msg: '删除首页轮播图'}
    }
    //感觉可以不必做修改，因为不是啥复杂的东西
}

module.exports = CarouselController