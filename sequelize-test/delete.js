const { Blog, User } = require('./model')

!(async () => {
  /**
   * @description 删除一条博客数据
   */
  // const deleteblogRes = await Blog.destroy({
  //   where: {
  //     id: 4
  //   }
  // })
  // console.log(
  //   'deleteBlogRes',
  //   deleteblogRes
  // )

  // if (deleteblogRes > 0) {
  //   console.log('删除博客数据成功success')
  // } else {
  //   console.log('删除博客数据失败error')
  // }

  /**
   * @description 删除一条用户数据（外键关系）
   * 注意 workbench 建立外键关系选值
   * on Update: CASCADE、  SET NULL、 NO ACTION
   * on Delete: CASCADE、 *SET NULL、 NO ACTION
   */
  const deleteUserRes = await User.destroy({
    where: {
      id: 1
    }
  })
  console.log(
    'deleteUserRes',
    deleteUserRes
  )

  if (deleteUserRes > 0) {
    console.log('删除用户数据成功success')
  } else {
    console.log('删除用户数据失败error')
  }
})()