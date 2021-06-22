/**
 * @description 微博 @ 关系 controller
 */

const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
} = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取 @ 我的微博数量
 * @param {number}} userId 用户ID
 */
async function getAtMeCount(userId) {
  // service
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId 用户ID
 * @param {number} pageIndex 页码
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  // service
  const result = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const { count, blogList } = result

  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
  })
}

/**
 * 标记为已读
 * @param {number} userId 用户ID
 */
async function markAsRead(userId) {
  // service
  try {
    await updateAtRelation(
      { newIsRead: true },
      { userId, isRead: false }
    )
  } catch (ex) {
    console.error(ex)
  }
  // 不要返回 SuccessModel 或者 ErrorModel
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}