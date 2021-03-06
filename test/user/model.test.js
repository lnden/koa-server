/**
 * @description user model test
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: '123456',
    nickName: '张三',
    // gender: 1 //可以不写 有默认值
    picture: '/xxxx.png',
    city: '北京'
  })

  // /验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3) // 测试gender 默认值3
  expect(user.picture).toBe('/xxxx.png')
  expect(user.city).toBe('北京')
})