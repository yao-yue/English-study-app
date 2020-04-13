import { message } from 'antd'
import axios from 'axios'
axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//封装axios，集中错误处理

export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let result   //接收请求的结果，是一个promise
        if (method === 'GET') {
            result = axios({
                method:'get',
                url,
                params: data,
              })
        } else if (method === 'POST') {
            result = axios.post(url, data)
        } else if (method === 'DELETE') {
            result = axios.delete(url, data)
        } else if (method === 'PUT') {
            result = axios.put(url, data)
        }
        //把result拆开看看结果,   类似于await的作用
        result.then(response => {
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('请求出错了: ' + error.message)
            console.log(error.message)
        })
    })
}