/**
 * @description user controller
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/error')
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
    return new ErrorModel(registerUserNameExistInfo)
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

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名 
 */
async function deleteCurUser(userName) {
  // service
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  // service
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture,
    },
    { userName }
  )
  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    },
    {
      userName,
      password: doCrypto(password)
    }
  )

  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 * @returns 
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}