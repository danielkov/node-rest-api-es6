const koa = require('koa');
const app = koa();

require('./db');

const router = require('koa-router')();

const apiRoutes = require('./routes/api');

router.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods())

app
.use(router.routes(), router.allowedMethods())
.use(require('koa-static')(__dirname + '/public'));

app.listen(3000);

console.log('Wohoo, we\'re up!');
