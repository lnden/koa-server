const Sequelize = require('sequelize')
const seq = require('./seq')

/**
 * @description 创建 User 模型，数据表的名字是 users
 */
const User = seq.define('user', {
  // id 会自动创建，并设为主键、自增
  userName: {
    type: Sequelize.STRING, // 'varchar(255)'
    allowNull: false // 是否为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称' // 可以写注释
  }
})

/**
 * @description 创建 Blog 模型， 数据表的名称是blogs
 */
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

/**
 * @description 外键关联
 * blog 属于 user 模型
 */
Blog.belongsTo(User, {
  // 创建外键 Blog.userId => User.id
  forignKey: 'userId'
})

/**
 * @description 外键关联
 * blog 属于 user 模型
 */
User.hasMany(Blog, {
  // 创建外键 Blog.userId => User.id
  forignKey: 'userId'
})


module.exports = {
  User,
  Blog
}