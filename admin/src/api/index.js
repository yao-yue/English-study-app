import ajax from './ajax'

const BASE = 'http://127.0.0.1:7001/admin'

// 请求二次封装

//登录
export const reqLogin = (username, password) => ajax(BASE + '/checkLogin', {username, password}, 'POST')


//单词
export const getWordList = () => ajax(BASE + '/getWordList', {}, 'GET')
// export const uploadWord = () => ajax(BASE + '/uploadWord', {}, 'POST')   //上传组件直接调用那个接口，不用在此暴露
export const editWordById = (id, data) => ajax(BASE + '/editWordById/'+ id, data, 'PUT')
export const deleteWordById = (id) => ajax(BASE + '/deleteWordById/'+ id, {}, 'DELETE')
export const searchWordByName = (wordName) => ajax(BASE + '/searchWordByName', {wordName}, 'GET')
export const searchWordById = (id) => ajax(BASE + '/searchWordById/'+id,{},'GET' )
export const batchDeleteWord = () => ajax(BASE + '/batchDeleteWord', {}, 'DELETE')
export const wordDeduplication = () => ajax(BASE + '/wordDeduplication', {}, 'PUT')