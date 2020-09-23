( async function(){
    const koa = require('koa');
    const koaStaticCache = require('koa-static-cache')
    const koaRouter = require('koa-router')
    const koaBodyParser = require('koa-bodyparser')
    const md5 = require('md5')
    const app = new koa();
    const Models = require('./models/index') // 引入模型
    const router = koaRouter();
    app.use(async (ctx, next)=> {
        console.log('123')
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (ctx.method == 'OPTIONS') {
          ctx.body = 200; 
        } else {
          await next();
        }
      });
    app.use(koaStaticCache('./public'), {
        prefix: 'public',
        gzip: true
    });
    let pageNum = 2;

    let users = await Models.Users.findAll();
   /*  let data = await Models.Users.findByPk(1, // 联合查询  查询当前用户，并查询该用户所有内容
        {
            include:{
                model: Models.Contents
            }
        });
        console.log(data) */
    router.get('/', async ctx => {
        let page = ctx.query.page || 1;
        let offset = (page - 1) * pageNum; // 处理分页
        let data = await Models.Contents.findAndCountAll({ //  查询所有评论以及所对应的的用户3
            limit:2, // 每页2条数据，从第几页开始
            offset,
            include: {
                model: Models.Users
            }
        })
        ctx.body = {
            code: 200,
            data,
            pageNum
        }
    });
    router.post('/register', async ctx => {
        let username = ctx.request.body.username
        let password = ctx.request.body.password
        let repassword = ctx.request.body.repassword
        if (username === '' || password === '' || repassword === '')
        {
            return ctx.body = {
                code: 1,
                data: '用户名和密码不能为空'
            }
        }
        if (password != repassword)
        {
            return ctx.body = {
                code: 2,
                data: '两次输入密码不一致'
            }
        }
        let user = await Models.Users.findOne( // （查）
            {
                where: {
                    username
                }
            }
        );
        if (user !== null)
        {
            return ctx.body = {
                code: 3,
                data: '当前用户名已被注册'
            }
        }
      let newUser =  await Models.Users.build({ // 新建模型对象实例 （增）
            username,
            password: md5(password)
            }).save();
        ctx.body = {
            code: 0,
            data: {
           id: newUser.get('id'),
           name: username
            }
        }
        
    })
    router.post('/login', async ctx => {
        let username = ctx.request.body.username
        let password = ctx.request.body.password
        if (username === '' || password === '')
        {
            return ctx.body = {
                code: 1,
                data: '用户名和密码不能为空'
            }
        }
        let user = await Models.Users.findOne( // （查）
            {
                where: {
                    username
                }
            }
        );
        if (user === null)
        {
            return ctx.body = {
                code: 3,
                data: '用户不存在'
            }
        }
        if (user.get('password') !== md5(password))
        {
            return ctx.body = {
                code: 2,
                data: '密码错误'
            }
        }
        ctx.body = {
            code: 0,
            data: {
                id: user.get('id'),
                msg: '登陆成功！'
            }
        }
        
    })


    app.use( koaBodyParser() );
    app.use(router.routes()) // 挂载










    app.listen(80);

})();