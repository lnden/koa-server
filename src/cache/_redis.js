/**
 * @description 连接 redis 的方法
 * @method
 *    get()
 *    set()
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')
const { port, host } = REDIS_CONF

// 创建客户端
const redisClient = redis.createClient(port, host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * @description redis set()
 * @param {string} key key
 * @param {string} val value
 * @param {number} timeout 过期时间 单位s 
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * @description redis get()
 * @param {string} key 键
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}