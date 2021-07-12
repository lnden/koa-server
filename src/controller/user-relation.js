/**
 * @description 用户关系 controller
 */

const {
  getUsersByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo } = require('../model/error')

/**
 * 获取粉丝列表
 * @param {number} userId 用户Id 
 */
async function getFans(userId) {
  // service
  const { count, userList } = await getUsersByFollower(userId)

  //返回
  return new SuccessModel({
    count,
    fansList: userList
  })

}

/**
 * 获取关注人列表
 * @param {number} userId 用户ID
 */
async function getFollowers(userId) {
  // service
  const { count, userList } = await getFollowersByUser(userId)

  // 返回
  return new SuccessModel({
    count,
    followersList: userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  // service
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    console.error(ex)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {*} myUserId 当前登录的用户 id
 * @param {*} curUserId 要被取消关注的用户 id
 * @returns 
 */
async function unFollow(myUserId, curUserId) {
  // service

  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow
}