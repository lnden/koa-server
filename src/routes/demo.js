const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../middlewares/loginChecks')

router.prefix('/demo')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('demo', {
    title: 'hello koa 2!',
    msg: '你好',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: 'aaaa'
      },
      {
        id: 2,
        title: 'bbbb'
      },
      {
        id: 3,
        title: 'cccc'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', loginCheck, async (ctx, next) => {
  // const session = ctx.session

  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is loadMore API',
    userName,
    pageIndex
  }
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    userName,
    password
  }
})

module.exports = router