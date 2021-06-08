/**
 * @description user API router
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')
router.prefix('/api/user')

// 注册接口
router.post('/register', async (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller
  // ctx.body = await xx()
  ctx.body = await isExist(userName)
})

module.exports = router