const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitRouter {
  // 进行一些初始化操作
  static init(app) {
    // 接收传过来的Koa实例
    InitRouter.app = app

    // 调用封装了动态加载路由的函数
    // 静态方法只能通过类名调用
    InitRouter.initLoadRoutes()
  }

  // 封装动态加载路由的函数
  static initLoadRoutes() {

    // process.cwd()方法可以获取项目的根路径
    // 加入我把路由文件放在了项目的根目录的api文件夹下
    const appDirectory = `${process.cwd()}/src/routes`

    requireDirectory(module, appDirectory, { visit: ModuleLoad })

    function ModuleLoad(obj) {
      // 如果是路由就进行注册
      if (obj instanceof Router) {
        InitRouter.app.use(obj.routes(), obj.allowedMethods())
      } else {
        console.log(1111)
      }
    }
  }
}

module.exports = InitRouter