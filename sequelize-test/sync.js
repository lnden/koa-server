const seq = require('./seq')

require('./model')

seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('err')
})

seq.sync({
  force: true // 删除原有表，重新创建表
}).then(() => {
  console.log('sequelize sync success!')
  process.exit();
})