/**
 * @description 接口的错误信 (汇总去中心化)
 */

const userError = require('./userError.js')
const blogError = require('./blogError')
const relationError = require('./relationError')
const validateError = require('./validateError')

module.exports = {
  ...userError,
  ...blogError,
  ...relationError,
  ...validateError
}