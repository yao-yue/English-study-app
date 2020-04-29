'use strict'
const fs = require('mz/fs');
const Controller = require('egg').Controller

class WordController extends Controller {
    async getWordList() {
        const wordList = await this.app.mysql.query(`select * from words`)
        if(wordList.length > 0) {
            this.ctx.body = { status: 200, wordList }
        } else {
            this.ctx.body = { status: 404, msg: '请求的资源不存在' }
        }
    }

    //批量添加单词  通过json文件
    async uploadWord() {
        const ctx = this.ctx;
        ctx.body = {
            success: 'upload ok'
        }
        ctx.status = 201
        const mysql = this.app.mysql
        const file = ctx.request.files[0];
        let result;
        try {
            // 读取并处理文件
            fs.readFile(file.filepath, async function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("异步读取: " + data);
                result = JSON.parse(data.toString()).data;
                const setResult = await mysql.insert('words', result)
            });
        } finally {
            // 需要删除临时文件
            await fs.unlink(file.filepath);
        }
    }

    //对某个单词进行编辑修正
    async editWordById() {
        //获取传过来的单词id、对这个单词的数据进行编辑
        this.ctx.body = { msg: '对某个单词进行编辑修正' }
    }

    //在数据库删除某个单词
    async deleteWordById() {
        //获取传过来的单词id,删除这个单词
        const id = this.ctx.params.id
        const result = await this.app.mysql.delete('words', { id})
        if(result.affectedRows > 0) {
            this.ctx.body = { status: 200, msg: 'delete success' }
        }else {
            this.ctx.body = { status: 403, msg: 'delete fail' }
        }
    }

    //根据单词名称查询单词
    async searchWordByName() {
        //获取穿过来的单词，进行查询
        this.ctx.body = { msh: 'test success' }
    }

    //数据库去重  效率很高 
    async deduplication() {
        const { ctx } = this;
        const mysql = this.app.mysql
        const sql = `
        DELETE 
        FROM
        words AS ta 
        WHERE
            ta.id <> (
            SELECT
            t.maxid 
        FROM
        ( SELECT max( tb.id ) AS maxid FROM words AS tb WHERE ta.wordName = tb.wordName ) t 
        );
        `
        const res = mysql.query(sql)
        ctx.body = { res }
    }

    //把单词全部删除 有时为了调整词库 这是一个逃生舱，可以考虑是否提供给后台管理系统
    async batchDelete() {
        const { ctx } = this;
        const mysql = this.app.mysql
        const res = await mysql.delete('words', {})
        ctx.body = { res }
    }
}

module.exports = WordController