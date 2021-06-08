/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  // 业务逻辑处理(无)
  // 调用 services 获取数据
  // 统一返回格式

  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在  { errno: 0, data: {....} }
    return new SuccessModel(userInfo)
  } else {
    // 不存在 { errno: 10003, message: '用户名已存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别(1男, 2女, 3保密)
 */
async function register({ userName, password, gender }) {
  // 业务逻辑处理
  // 调用 services 获取数据
  // 返回统一格式
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return ErrorModel(registerUserNameExistInfo)
  }

  // 注册 service
  try {
    console.log('try')
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}


module.exports = {
  isExist,
  register
}