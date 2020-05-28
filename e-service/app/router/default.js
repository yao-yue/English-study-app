// 服务前端的路由

module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.home.index)

    //没有拆分直接用吧
    router.get('/default/getCarousel',controller.default.home.getCarousel)
    router.get('/default/getWordList',controller.default.home.getWordList)
    router.get('/default/getVideoList',controller.default.home.getVideoList)
    router.get('/default/getWriteQuestionList',controller.default.home.getWriteQuestionList)
    router.get('/default/getWriteGuideList',controller.default.home.getWriteGuideList)
}