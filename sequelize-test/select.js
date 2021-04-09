const { Blog, User } = require('./model')

!(async () => {
  /**
   * @description 查询一条记录
   * @method findOne()
   */
  const lily = await User.findOne({
    where: {
      userName: 'Lily'
    }
  })
  // console.log(lily.dataValues)

  /**
   * @description 查询特定列的数据
   * @method findOne()
   *    attributes: ['userName', 'nickName']
   */
  const lilyColumns = await User.findOne({
    where: {
      userName: 'Lily'
    },
    attributes: ['userName', 'nickName']
  })
  // console.log(lilyColumns.dataValues)

  /**
   * @description 查询一个列表 查询lily的所有博客
   * @method findOne()
   *    order: [ ['id', 'desc'] ] // 倒序查询
   */
  const lilyBlogList = await Blog.findAll({
    where: {
      userId: 1
    },
    order: [
      ['id', 'desc']
    ]
  })
  // console.log(
  //   'lilyBlogList',
  //   lilyBlogList.map(blog => blog.dataValues)
  // )

  /**
   * @description 查询一个分页
   * @method findAll()
   *    limit: 2 // 限制本次查询多少条
   *    offset: 2 // 跳过多少条查询
   */
  const blogPageList = await Blog.findAll({
    limit: 2,
    offset: 0,
    order: [
      ['id', 'desc']
    ]
  })
  // console.log(
  //   'blogPageList',
  //   blogPageList.map(blog => blog.dataValues)
  // )

  /**
   * @description 查询总条数 count
   * @method findAndCountAll()
   */
  const blogPageListCount = await Blog.findAndCountAll({
    limit: 2,
    offset: 0,
    order: [
      ['id', 'desc']
    ]
  })
  // console.log(
  //   'blogPageListCount',
  //   blogPageListCount.count, //所有的总数，不考虑分页
  //   blogPageListCount.rows.map(blog => blog.dataValues)
  // )

  /**
   * @description 连表查询-1
   * 通过 Blog 根据 include 查询 User
   */
  const blogListWithUser = await Blog.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'Lily'
        }
      }
    ]
  })
  // console.log(
  //   'blogListWithUser',
  //   blogListWithUser.count,
  //   blogListWithUser.rows.map(blog => {
  //     const blogValue = blog.dataValues
  //     blogValue.user = blogValue.user.dataValues
  //     return blogValue
  //   })
  // )

  /**
   * @description 连表查询-1
   * 通过 Blog 根据 include 查询 User
   */
  const userListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog
      }
    ]
  })
  console.log(
    'userListWithBlog',
    userListWithBlog.count,
    userListWithBlog.rows.map(user => {
      const userValue = user.dataValues
      userValue.blogs = userValue.blogs.map(blog => JSON.stringify(blog.dataValues))
      return userValue
    })
  )
})()
