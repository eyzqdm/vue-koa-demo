const jwt = require('jsonwebtoken')
async function check(ctx, next) {

    let url = ctx.url.split('?')[0]
    
    // 如果是登陆页面和注册页面就不需要验证token了
    if (url === '/' || url === '/login'|| url === '/register') {
        await next()
    } else {
        // 否则获取到token
        let token = await ctx.request.headers.authorization
        if (token !== 'null') {
            // 如果有token的话就开始解析
            const tokenItem = jwt.verify(token, 'token')
            // 将token的创建的时间和过期时间结构出来
            const { time, timeout } = tokenItem
            // 拿到当前的时间
            let data = new Date().getTime();
            // 判断一下如果当前时间减去token创建时间小于或者等于token过期时间，说明还没有过期，否则过期
            if (data - time <= timeout) {
                // token没有过期
                await next()
            } else {
                ctx.body = {
                    status: 3,
                    data:'token 已过期，请重新登陆'
                }  
            }
        }
        else {
            ctx.body = {
                code: 2,
                data:'请先登录'
            }  
        }
    }
    
}



module.exports = check
