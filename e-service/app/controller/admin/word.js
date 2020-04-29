'use strict'
const Controller = require('egg').Controller

class WordController extends Controller {
    async getWordList() {
      this.ctx.body = { msg: '获取单词列表'}
    }

    //批量添加单词
    async addBatchWord() {
        // 或许可以在这个接口上得到上传的文件。

        //获取数据、 处理数据、 保存数据
        this.ctx.body = { msg: '通过文件来添加单词'}
    }  
    
    //对某个单词进行编辑修正
    async editWordById() {
        //获取传过来的单词id、对这个单词的数据进行编辑
        this.ctx.body = { msg: '对某个单词进行编辑修正'}
    }

    //在数据库删除某个单词
    async deleteWordById() {
        //获取传过来的单词id,删除这个单词
        this.ctx.body = { msg : 'test success'}
    }

    //根据单词名称查询单词
    async searchWordByName() {
        //获取穿过来的单词，进行查询
        this.ctx.body = { msh: 'test success'}
    }
}

module.exports = WordController