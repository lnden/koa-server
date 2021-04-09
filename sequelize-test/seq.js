const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

/**
 * @description 线上环境使用连接池
 */
// conf.pool = {
//   max: 5, // 连接池中最大的连接数量
//   min: 0, // 最小
//   idle: 10000 // 如果一个连接池 10s 之内没有被使用，则释放; 单位毫秒
// }

const seq = new Sequelize('database', 'root', 'password', conf)

module.exports = seq

/**
 * @description 测试连接
 */
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(() => {
//   console.log('err')
// })