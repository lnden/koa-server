const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const app = new Koa();

const mimes = {
  css: 'text/css',
  less: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
}

// 解析请求的资源类型
function parseMime(url) {
  // path.extname获取路径中文件的后缀名
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return mimes[extName]
}

// fs读取文件
const parseStatic = (dir) => {
  return new Promise((resolve) => {
    resolve(fs.readFileSync(dir), 'binary')
  })
}

const getFileStat = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (stats) {
        resolve(stats)
      } else {
        reject(err)
      }
    })
  })
}

app.use(async (ctx) => {
  const url = ctx.request.url;
  if (url === '/') {
    // 访问根路径返回index.html
    ctx.set('Content-Type', 'text/html')
    ctx.body = await parseStatic('./http-cache/index.html')
  } else {
    const filePath = path.resolve(__dirname, `.${url}`)
    ctx.set('Content-Type', parseMime(url))
    /**
     * @title 强缓存 http1.0
     * @descript Expires
     */
    // 设置30秒后过期
    // ctx.set('Expires', new Date(Date.now() + 30000))
    // ctx.body = await parseStatic(filePath)

    /**
     * @title 强缓存 http1.1
     * @descript Cache-Control max-age=30
     */
    // 设置30秒后过期
    // ctx.set('Cache-Control', 'max-age=30')
    // ctx.body = await parseStatic(filePath)

    /**
     * @title 协商缓存 htpp1.0
     * @descript Last-Modified、if-modified-since
     */
    // ctx.set('Cache-Control', 'no-cache')
    // const ifModifiedSince = ctx.request.header['if-modified-since']
    // const fileStat = await getFileStat(filePath)
    // if (ifModifiedSince === fileStat.mtime.toGMTString()) {
    //   ctx.status = 304
    // } else {
    //   ctx.set('Last-Mdified', fileStat.mtime.toGMTString())
    //   ctx.body = await parseStatic(filePath)
    // }

    /**
     * @title 协商缓存 http1.1
     * @descript Etag、if-none-match
     */

    ctx.set('Cache-Control', 'no-cache')
    const fileBuffer = await parseStatic(filePath)
    const ifNoneMatch = ctx.request.headers['if-none-match']
    const hash = crypto.createHash('md5')
    hash.update(fileBuffer)
    const etag = `"${hash.digest('hex')}"`
    if (ifNoneMatch === etag) {
      ctx.status = 304
    } else {
      ctx.set('etag', etag)
      ctx.body = fileBuffer
    }
  }
})

app.listen(3000, () => {
  console.log('starting at port 3000')
})