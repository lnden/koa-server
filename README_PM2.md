### PM2 常用命令

1. 启动
  - pm2 start bin/www
  - pm2 start app.js [-i max 进程数]

2. 查看进程
  - pm2 list

3. 停止
  - pm2 stop 0
  - pm2 stop all

4. 重载
  - pm2 reload 0
  - pm2 reload all

5. 重启
  - pm2 restart 0
  - pm2 restart all

6. 删除PM2进程
  - pm2 delte 0
  - pm2 delete all

7. 显示每个应用程序的CPU和内存占用情况
  - pm2 monit

8. 显示应用程序的所有信息
  - pm2 show [app-name]

### 添加配置文件 pm2.conf.json
```
  - "prd": "cross-env NODE_ENV=prod pm2 start bin/www",
  + "prod": "cross-env NODE_ENV=prod pm2 start pm2.conf.json",
```

### 重载和重启的区别
reload 与之相对 restart，其杀死并重新启动该过程，reload实现了0秒停机重新加载。
