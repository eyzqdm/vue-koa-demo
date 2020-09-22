( async function(){
    const koa = require('koa');
    const koaStaticCache = require('koa-static-cache')
    const koaRouter = require('koa-router')
    const koaBodyParser = require('koa-bodyparser')
    const app = new koa();
    const Models = require('./models/index') // 引入模型
    const router = koaRouter();
     
    app.use(koaStaticCache('./public'), {
        prefix: 'public',
        gzip: true
    });

    router.get('/', async ctx => {
        ctx.body = '...'
    });

    app.use( KoaBodyParser() );
    app.use(router.routes()) // 挂载










    app.listen(80);

})();