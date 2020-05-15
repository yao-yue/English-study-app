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

//首页轮播图
export const getCarousel = () => ajax(BASE + '/getCarousel')
// export const addCarousel = (filename) => ajax(BASE + '/addCarousel', {filename}, 'POST')
export const deleteCarouselByName = (filename) => ajax(BASE + '/deleteCarouselByName',{filename}, 'DELETE')


//视频课程
export const getVideoList = () => ajax(BASE + '/getVideoList')
//上传视频课程--此接口只要一个路径
export const uploadVideo = BASE + '/uploadVideo'
export const uploadVideoImg = BASE + '/uploadVideoImg'
export const ossDelete = (params) => ajax(BASE + '/ossDelete', params, 'DELETE')
export const addVideo = (data) => ajax(BASE + '/addVideo', data, 'POST')
export const editVideoById = (id, data) => ajax(BASE + '/editVideoById/' + id, data, 'PUT')
export const deleteVideoById = (id) => ajax(BASE + '/deleteVideoById/'+ id, {}, 'DELETE')
export const searchVideoByType = (videoType) => ajax(BASE + '/searchVideoByType', {videoType},'GET')


//学习指南
export const getWriteGuideList = () => ajax(BASE + '/getWriteGuideList')
export const addWriteGuide = (data) => ajax(BASE + '/addWriteGuide', data, 'POST')
export const editWriteGuideById = (id, data) => ajax(BASE + '/editWriteGuideById/'+ id, data, 'PUT')
export const deleteWriteGuideById = (id) => ajax(BASE + '/deleteWriteGuideById/' + id, {}, 'DELETE')


//英语真题
export const getWriteQuestionList = () =>  ajax(BASE + '/getWriteQuestionList')
export const addWriteQuestion = (data) =>  ajax(BASE + '/addWriteQuestion', data, 'POST')
export const editWriteQuestionById = (id, data) =>  ajax(BASE + '/editWriteQuestionById/'+id, data, 'PUT')
export const deleteWriteQuestionById = (id) =>  ajax(BASE + '/deleteWriteQuestionById/'+ id, {}, 'DELETE')
export const searchWriteQuestionByType = (params) =>  ajax(BASE + '/searchWriteQuestionByType', params, 'GET')
