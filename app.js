require('module-alias/register');

const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');
const static = require('koa-static');
const path=require('path');


const app = new Koa();

app.use(catchError);
app.use(parser());
app.use(static(path.join(__dirname, './static')));

process.cwd();
InitManager.initCore(app);


app.listen(3000);