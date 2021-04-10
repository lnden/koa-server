/**
 * @description sequelize 存储配置
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

/**
 * 单元测试的时候不需要打印 sequelize sq语句
 */
if (isTest) {
  conf.loggin = () => { }
}

/**
 * 线上环境使用
 */
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq