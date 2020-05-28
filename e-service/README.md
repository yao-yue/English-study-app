# e-service

英语学习数据接口服务


### 接口步骤
1. 先连接数据库，配置一下。  egg-mysql


### 关于要实现哪些接口
- 后台管理。按类来分类
1. 管理员 登录  
2. 单词资源
3. 视频课程
4. 用户管理
5. 作文真题
6. 指导材料

- 小程序接口
1. 用户登录，录入数据库
2. 单词调用，定制单词表接口
3. 用户学习记录
4. 拉取单词信息，拉取视频信息。。。


### 关于restful
post    create
get     read
put     update
delete  delete

### 关于单词的处理
先用爬虫爬取数据处理成json文件，后台管理系统就接收json文件，然后把处理好的数据保存到数据库。
大致的逻辑流程是这样子的。
开搞，先搞爬虫开爬。

### 发现自己文件处理这一块有点不足，复习下egg的controller
1. 主要功能-- controller负责解析用户的输入，处理后返回相应的结果
2. this挂着的东西，this.ctx this.app this.service this.config this.logger
3. 获取http请求参数
- query   const query = this.ctx.query;
- ctx.params     路由上声明的参数可以通过这个拿到 
    app.get('/projects/:projectId/app/:appId', 'app.listApp');
    this.ctx.params.appId  ----- 即可拿到
- body 
    框架内置了 bodyParser 中间件来对这两类格式的请求 body 解析成 object 挂载到 ctx.request.body 上。
    this.ctx.request.body.content, 'what is controller'
    一些配置：Content-Type：application/json  ....按照json格式进行解析，100kb
    application/x-www-form-urlencoded      按照form格式进行解析  100kb
    长度限制可以在配置里面配置bodyParser.
    **一个常见的错误是把 ctx.request.body 和 ctx.body 混淆，后者其实是 ctx.response.body 的简写。**
- header ctx.get(name) 可以获得请求头的属性
- cookie  cookie 封装了cookie处理起来会更加简单 get set
- session 通过 Cookie，我们可以给每一个用户设置一个 Session，用来存储用户身份相关的信息，这份信息会加密后存储在 Cookie 中，实现跨请求的用户身份保持.框架内置了 Session 插件，给我们提供了 ctx.session 来访问或者修改当前用户 Session 
-  this.ctx.status = 201;  便捷的设置转台码


### 文件上传搞定了  但是一个问题就是对于大文件的处理以及如何把他们存储进数据库
大文件存入数据库解决了 ，又出现一个问题
如果数据库设置自动增长的话会出现一个问题，就是会可能会出现重复插入数据的情况，这个时候就需要数据库去重，或者插入的时候就做校验。
数据库去重
```
DELETE 
FROM
	table_name AS ta 
WHERE
	ta.唯一键 <> (
SELECT
	t.maxid 
FROM
	( SELECT max( tb.唯一键 ) AS maxid FROM table_name AS tb WHERE ta.判断重复的列 = tb.判断重复的列 ) t 
	);
```

### 还发现了一个问题
当egg-mysql插入数据的时候  4000个单词的数据只插入了大概1000个单词的数据进数据库里面了。
噢  原来是navicat里面的一个页面只显示1000条数据，可以翻页。
ok  到这里就差不多大概的逻辑能理清楚了。把单词搞完再去搞一下小程序的页面就把那个先交给老师.
- 又出现一个问题，react页面去提交表单action的地址会出现问题. 原来是http:// 这两个斜杠没打
- 还有一个问题就是数据存到数据库里面去了，但是还是会报404，初步考虑应该是异步的问题.
    **这个bug先留着，下次想到好的办法的时候再来解决**


### 对阿里云文件上传的方式的一些理解
1. 关于STS方式，就是请求后端接口，然后后端返回crendental，然后凭借这个你可以构建出client来直接做一些操作，比如put文件到阿里云上面，而不是通过接口上传到后端，然后再让后端调用put上传到aliyun，可以避免一步操作
2. 获取文件的访问权限，要不还是就用signUrl的方式把。


### egg-mysql 分页
计算公式 offset = page * limit - limit
/**
 * 分页查询
 * @param offset 起始页
 * @param limit 每页展示条数
 * offset=page*limit-limit
 */
const query = {
  offset: app.toInt(pageNum) * app.toInt(pageSize) - app.toInt(pageSize),
  limit: app.toInt(pageSize)
};
return await app.model.Diary.findAndCountAll({ ...query, raw: true });
关于node，还需要补充一点sequelize知识，最好是把npm上的一些小例子实验一下。

为什么要sequelize，因为如果要增加一些字段的话还得重新弄数据库。就比较麻烦，而sequelize就能自动去做数据库那些。

