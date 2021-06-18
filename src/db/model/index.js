/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 添加外键关系(一个用户拥有多个微博) 查询微博带出用户信息
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// Blog.belongsTo(User) 这里可以不用写参数 { foreignKey: 'userId' },会自动创建userId, Blog.js注释掉userId

// 查询用户带出微博的信息
// User.hasMany(Blog)

// 添加外键关系
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}
