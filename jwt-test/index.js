const Koa = require('koa')
const jwtKoa = require('koa-jwt')
const bodyparser = require('koa-bodyparser')
const { SECRET } = require('./conf/constant')

const app = new Koa()

const Index = require('./routes')

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(jwtKoa({
  secret: SECRET
}).unless({
  path: [/\/register/, /\/login/]
}))


app.use(Index.routes(), Index.allowedMethods())


module.exports = app