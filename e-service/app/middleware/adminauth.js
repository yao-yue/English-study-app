//路由守卫,每次请求api的时候都会在这里验证一下
//条件，开启跨域携带cookie creditalxxx:true

module.exports = options =>{
    return async function adminauth(ctx,next){
        console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={status:"401", msg:"no authorize"}
        }
    }
}