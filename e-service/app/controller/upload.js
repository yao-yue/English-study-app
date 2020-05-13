//测试阿里云文件上传接口
'use strict'
//一个问题，文件上传时文件名最好是时间戳加随机数的拼接比较好。moment包主要是做时间格式化的

let OSS = require('ali-oss')
const Controller = require('egg').Controller
const fs = require('mz/fs');
const client = new OSS({
  bucket: 'en-source',
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4G9RKoGn14ht7Y4eDWLE',
  accessKeySecret: '7UzJ1p2YhKTpCxXAOpB9Z3yaNbpwFR'
})

// const STS = OSS.STS
// const sts = new STS({
//   accessKeyId: 'LTAI4G9RKoGn14ht7Y4eDWLE',
//   accessKeySecret: '7UzJ1p2YhKTpCxXAOpB9Z3yaNbpwFR'
// })
// const policy = {
//   "Statement": [
//     {
//       "Action": [
//         "oss:Get*"
//       ],
//       "Effect": "Allow",
//       "Resource": ["acs:oss:*:*:en-source/*"]
//     }
//   ],
//   "Version": "1"
// };

class upload extends Controller {
  async listBuckets() {
    try {
      let result = await client.list();
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }
  async putf() {
    const imgFile = this.ctx.request.files[0];    //获取的图片文件
    const suffix = imgFile.filename.replace(/[^\.]\w*/,'')
    const time = new Date()
    const filename = time.getTime().toString() + parseInt(Math.random() * 9999) + suffix
    try {
        let result = await client.put('carousel/' + filename, imgFile.filepath);
        this.ctx.body = {
          code: 200,
          data: {
            filename,
          }
        }
    } finally {
      // 需要删除临时文件
      await fs.unlink(imgFile.filepath);
    }
  }

  async test() {
    //测试STS授权
    // const role = `acs:ram::1633924657138490:role/ripple01`
    // try {
    //   let token = await sts.assumeRole(
    //   role, policy, 15 * 60, 'session-key');
    //   this.ctx.body = {
    //     code:200,
    //     data: {
    //       credentials : token.credentials
    //     }
    //   }
    //   let client = new OSS({
    //     region: 'oss-cn-beijing',
    //     accessKeyId: token.credentials.AccessKeyId,
    //     accessKeySecret: token.credentials.AccessKeySecret,
    //     stsToken: token.credentials.SecurityToken,
    //     bucket: 'en-source'
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  }
}

module.exports = upload