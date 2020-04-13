import ajax from './ajax'

const BASE = 'https://rect.red/admin'

// 请求二次封装

//登录
export const reqLogin = (username, password) => ajax(BASE + '/checkLogin', {username, password}, 'POST')
//获取文章类型
export const getTypeInfo = () => ajax(BASE+ '/getTypeInfo')
// 添加文章
export const addArticle = (data) => ajax(BASE + '/addArticle', data, 'POST')
// 根据文章id修改文章
export const updateArticle = (id,data) => ajax(BASE + '/updateArticle/' + id, data, 'PUT')
// 获取文章列表
export const getArticleList = () => ajax(BASE + '/getArticleList')
// 删除文章
export const delArticleById = id => ajax(BASE + '/delArticle/'+ id,{}, 'DELETE')
// 通过id获取文章id
export const getArticleById = id => ajax(BASE + '/getArticleById/'+id)