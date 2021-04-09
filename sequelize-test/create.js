const { Blog, User } = require('./model')

!(async () => {
  /**
   * @description 创建用户
   */
  const lily = await User.create({
    userName: 'Lily',
    password: '123456',
    nickName: '莉莉'
  })
  console.log('Lily', lily.dataValus)
  const lilyId = lily.dataValues.id;
  console.log(lilyId)

  const tom = await User.create({
    userName: 'Tom',
    password: '123456',
    nickName: '汤姆'
  })
  console.log('Tom', tom.dataValus)
  const tomId = tom.dataValues.id;
  console.log(tomId)

  /**
   * @description 创建博客
   */
  const blog1 = await Blog.create({
    title: '文章1111',
    content: '内容1111',
    userId: lilyId
  })
  console.log('blog1', blog1.dataValues)

  const blog2 = await Blog.create({
    title: '文章2222',
    content: '内容2222',
    userId: lilyId
  })
  console.log('blog2', blog2.dataValues)

  const blog3 = await Blog.create({
    title: '文章3333',
    content: '内容3333',
    userId: tomId
  })
  console.log('blog1', blog3.dataValues)

  const blog4 = await Blog.create({
    title: '文章4444',
    content: '内容4444',
    userId: tomId
  })
  console.log('blog4', blog4.dataValues)
})()