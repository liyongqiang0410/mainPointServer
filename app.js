const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const server = require("koa-static");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const requireDirectory = require("require-directory");
const router = new Router();
const koaStatic = require("koa-static"); // 静态资源服务器
// batch route
const modules = requireDirectory(module, "./routes", { visit: whenLoadModule });
function whenLoadModule(obj) {
  if (obj instanceof Router) {
    app.use(obj.routes(), obj.allowedMethods());
  }
}

// error handler
onerror(app);

// middlewares 中间件
app.use(bodyparser());
app.use(server(__dirname + "upload/images")).use(router.routes());
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "PUT,DELETE,POST,GET");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 3600 * 24);
  await next();
});

// static server
app.use(koaStatic(__dirname, "./upload/images"));

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
