const router = require("koa-router")();
router.prefix('/login')

router.get('/', (ctx, next) => { 
  ctx.body = 'this is a login response!'
})

module.exports = router