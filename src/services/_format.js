/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {object} obj 用户头像 
 * @returns 
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 
 * @param {Array|Object} list 用户列表或者单个用户对象 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组的形式 用户列表
    return list.map(_formatUserPicture)
  }

  // 单个用户对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}