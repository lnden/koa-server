// 常用模块
const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const logger = require('koa-logger')

// session和redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF: { host, port } } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/cecretKeys')
const { isProd } = require('./utils/env')
const InitRouter = require('./core/init')
const app = new Koa()

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
InitRouter.init(app)
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
