module.exports = app => {
    const {router, controller} = app
    // let adminauth = app.middleware.adminauth()
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)

    //单词对象
    router.get('/admin/getWordList', controller.admin.word.getWordList)
    router.post('/admin/uploadWord', controller.admin.word.uploadWord)
    router.put('/admin/editWordById/:id', controller.admin.word.editWordById)
    router.delete('/admin/deleteWordById/:id',controller.admin.word.deleteWordById)
    router.get('/admin/searchWordById/:id', controller.admin.word.searchWordById)
    router.get('/admin/searchWordByName',controller.admin.word.searchWordByName)
    router.delete('/admin/batchDeleteWord',controller.admin.word.batchDeleteWord)
    router.put('/admin/wordDeduplication', controller.admin.word.wordDeduplication)

    //视频对象
    router.get('/admin/getVideoList', controller.admin.video.getVideoList)
    router.post('/admin/addVideo', controller.admin.video.addVideo)
    router.put('/admin/editVideoById/:id', controller.admin.video.editVideoById)
    router.delete('/admin/deleteVideoById/:id', controller.admin.video.deleteVideoById)
    router.get('/admin/searchVideoByType', controller.admin.video.searchVideoByType)
    //上传视频文件到阿里云oss
    router.post('/admin/uploadVideo', controller.admin.video.uploadVideo)
    //上传视频封面文件到阿里云oss
    router.post('/admin/uploadVideoImg', controller.admin.video.uploadVideoImg)
    //删除阿里云oss的文件(传参，type[video,videoImg]和filename)
    router.delete('/admin/ossDelete', controller.admin.video.ossDelete)

    // 用户对象
    router.get('/admin/getUserList', controller.admin.user.getUserList)
    router.put('/admin/editUserById', controller.admin.user.editUserById)
    router.delete('/admin/deleteUserById', controller.admin.user.deleteUserById)

    // 首页轮播图对象
    router.get('/admin/getCarousel', controller.admin.carousel.getCarousel)
    router.post('/admin/addCarousel', controller.admin.carousel.addCarousel)
    router.delete('/admin/deleteCarouselByName', controller.admin.carousel.deleteCarouselByName)

    // 作文指导指南
    router.get('/admin/getWriteGuideList', controller.admin.writeGuide.getWriteGuideList)
    router.post('/admin/addWriteGuide', controller.admin.writeGuide.addWriteGuide)
    router.put('/admin/editWriteGuideById/:id', controller.admin.writeGuide.editWriteGuideById)
    router.delete('/admin/deleteWriteGuideById/:id', controller.admin.writeGuide.deleteWriteGuideById)

    // 作文真题
    router.get('/admin/getWriteQuestionList', controller.admin.writeQuestion.getWriteQuestionList)
    router.post('/admin/addWriteQuestion', controller.admin.writeQuestion.addWriteQuestion)
    router.put('/admin/editWriteQuestionById/:id', controller.admin.writeQuestion.editWriteQuestionById)
    router.delete('/admin/deleteWriteQuestionById/:id', controller.admin.writeQuestion.deleteWriteQuestionById)
    router.get('/admin/searchWriteQuestionByType', controller.admin.writeQuestion.searchWriteQuestionByType)
}