module.exports = app => {
    const {router, controller} = app
    // let adminauth = app.middleware.adminauth()
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)

    //单词对象
    router.get('/admin/getWordList', controller.admin.word.getWordList)
    router.post('/admin/uploadWord', controller.admin.word.uploadWord)
    router.put('/admin/editWordById', controller.admin.word.editWordById)
    router.delete('/admin/deleteWordById/:id',controller.admin.word.deleteWordById)
    router.get('/admin/searchWordByName',controller.admin.word.searchWordByName)
    router.delete('/admin/batchDelete',controller.admin.word.batchDelete)
    router.put('/admin/deduplication', controller.admin.word.deduplication)

    //视频对象
    router.get('/admin/getVideoList', controller.admin.video.getVideoList)
    router.post('/admin/addVideo', controller.admin.video.addVideo)
    router.put('/admin/editVideoById', controller.admin.video.editVideoById)
    router.delete('/admin/deleteVideoById', controller.admin.video.deleteVideoById)
    router.get('/admin/searchVideoByType', controller.admin.video.searchVideoByType)

    // 用户对象
    router.get('/admin/getUserList', controller.admin.user.getUserList)
    router.put('/admin/editUserById', controller.admin.user.editUserById)
    router.delete('/admin/deleteUserById', controller.admin.user.deleteUserById)

    // 首页轮播图对象
    router.get('/admin/getCarousel', controller.admin.carousel.getCarousel)
    router.post('/admin/addCarousel', controller.admin.carousel.addCarousel)
    router.delete('/admin/deleteCarouselById', controller.admin.carousel.deleteCarouselById)

    // 作文指导指南
    router.get('/admin/getWriteGuideList', controller.admin.writeGuide.getWriteGuideList)
    router.post('/admin/addWriteGuide', controller.admin.writeGuide.addWriteGuide)
    router.put('/admin/editWriteGuideById', controller.admin.writeGuide.editWriteGuideById)
    router.delete('/admin/deleteWriteGuideById', controller.admin.writeGuide.deleteWriteGuideById)

    // 作文真题
    router.get('/admin/getWriteQuestionList', controller.admin.writeQuestion.getWriteQuestionList)
    router.post('/admin/addWriteQuestion', controller.admin.writeQuestion.addWriteQuestion)
    router.put('/admin/editWriteQuestionById', controller.admin.writeQuestion.editWriteQuestionById)
    router.delete('/admin/deleteWriteQuestionById', controller.admin.writeQuestion.deleteWriteQuestionById)
    router.get('/admin/searchWriteQuestionByType', controller.admin.writeQuestion.searchWriteQuestionByType)
}