const Controller = require('egg').Controller;
const fs = require('mz/fs');

module.exports = class extends Controller {
    async upload() {
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
        ctx.body = {res}
    }

    //把单词全部删除
    async batchDelete() {
        const { ctx } = this;
        const mysql = this.app.mysql
        const res = await mysql.delete('words',{})
        ctx.body = { res}
    }
};