( async function(){
    const koa = require('koa');
    const koaStaticCache = require('koa-static-cache')
    const koaRouter = require('koa-router')
    const koaBodyParser = require('koa-bodyparser')
    const app = new koa();
    const Models = require('./models/index') // 引入模型
    const router = koaRouter();
    app.use( async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin','*'); // 允许跨域
        await next();

    });
     
    app.use(koaStaticCache('./public'), {
        prefix: 'public',
        gzip: true
    });

    let users = await Models.Users.findAll();
   /*  let data = await Models.Users.findByPk(1, // 联合查询  查询当前用户，并查询该用户所有内容
        {
            include:{
                model: Models.Contents
            }
        });
        console.log(data) */
    let data = await Models.Contents.findAndCountAll({ //  查询所有评论以及所对应的的用户3
        limit:3, // 3条数据。第零页开始
        offset:0,
        include: {
            model: Models.Users
        }
    })
    router.get('/', async ctx => {
        ctx.body = {
            code: 200,
            data
        }
    });

    app.use( koaBodyParser() );
    app.use(router.routes()) // 挂载










    app.listen(80);

})();