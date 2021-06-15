/**
 * @description json test
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
  const res = await server.get('/demo/json')
  // server.post('/login').send({userName: '', ..})
  expect(res.body).toEqual({
    // title: 'koa2 json'
    errno: 10005,
    message: '您尚未登录',
  })

  // expect(res.body.title).toBe('koa2 json')
})