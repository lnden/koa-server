const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')

const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constant')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a / response!'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  let userInfo
  let token
  if (userName === 'lily' && password === '123456') {
    userInfo = {
      userId: 1,
      userName,
      nickName: '莉莉',
      gender: 0
    }
  }

  if (userInfo === null) {
    ctx.body = {
      errno: -1,
      msg: '登陆失败'
    }
    return
  }

  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }
  ctx.body = {
    errno: 0,
    data: token
  }
})

router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      data: payload
    }
  } catch (ex) {
    console.log(ex)
    ctx.body = {
      errno: 0,
      userInfo: 'abc'
    }
  }
})
module.exports = router