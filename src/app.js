const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/cecretKeys')
const { host, port } = REDIS_CONF

// router
const demo = require('./routes/demo')
const atAPIRouter = require('./routes/api/blog-at')
const blogSquareAPIRouter = require('./routes/api/blog-square')
const blogProfileAPIRouter = require('./routes/api/blog-profile')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userAPIRouter = require('./routes/api/user')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// 处理POST数据
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// 使得ctx.body可以接受一个json作为它的值
app.use(json())

app.use(logger())

// 静态文件
const staticPath = path.join(__dirname, '../public')
app.use(koaStatic(staticPath))

// 上传文件
const uploadPath = path.join(__dirname, '../uploadFiles')
app.use(koaStatic(uploadPath))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo:sid', // cookie name 默认是 'koa:sid'
  prefix: 'weibo:sess:', // redis key 的前缀 默认是 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 毫秒
  },
  store: redisStore({
    all: `${host}:${port}`
  })
}))


// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(demo.routes(), demo.allowedMethods())
app.use(atAPIRouter.routes(), atAPIRouter.allowedMethods())
app.use(blogSquareAPIRouter.routes(), blogSquareAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(), blogProfileAPIRouter.allowedMethods)
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // error/404 router

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
