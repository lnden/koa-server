const { User } = require('./model')

!(async () => {
  /**
   * @description 更新數據
   */
  const updateRes = await User.update({
    nickName: '莉莉安'
  }, {
    where: {
      userName: 'Lily'
    }
  })
  console.log(
    'updateRes...',
    updateRes[0]
  )

  if (updateRes[0] > 0) {
    console.log('修改成功了success')
  } else {
    console.log('修改失败了error')
  }
})()