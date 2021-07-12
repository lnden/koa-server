/**
 * @description:微博相关接口的错误信息
 */

module.exports = {
  // 创建微博失败
  createBlogFailInfo: {
    errno: 11001,
    message: '创建微博失败，请重试'
  },
  deleteBlogFail: {
    errno: 11002,
    msg: '删除微博失败'
  },
  getBlogListFail: {
    errno: 11003,
    msg: '查询微博列表失败'
  }
}
