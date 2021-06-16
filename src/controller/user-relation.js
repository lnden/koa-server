/**
 * @description 用户关系 controller
 */

const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResModel')
/**
 * 根 userId 获取粉丝列表
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
module.exports = {
  getFans
}