/**
 * @description 微博 service
 */


/**
 * 创建微博
 * @param {Object} param0 创建微博的数据 { userId, content, image }
 */
const { Blog } = require('../db/model/index')
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content, image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}