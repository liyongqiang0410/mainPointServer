const router = require("koa-router")();
const userDB = require("../models/user.js");

router.prefix("/users");

router.get("/findUserByUname", async (ctx, next) => {
  let query = ctx.request.query;
  if (!query.Uname) {
    ctx.body = {
      code: 101,
      message: "缺少参数",
    };
    return;
  }
  await userDB.findUserByUname(query).then((res) => {
    if (res.length === 0) {
      ctx.body = {
        code: 104,
        message: "查找成功,数据为空",
        data: [],
      };
    } else {
      ctx.body = {
        code: 100,
        message: "查找成功",
        data: res,
      };
    }
  });
});

module.exports = router;
