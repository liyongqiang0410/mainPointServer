/**通过 koa-body 实现文件上传
 * cnpm install @koa/multer multer --save
 * 注册中间件
 * 使用中间件实现上传
 * --但个文件上传
 * --多文件上传
 * */
const multer = require("@koa/multer");
const router = require("koa-router")();
const DB = require("../models/upload");
const now = require("../pub/lib/dateNow");
const path = require("path");

const storage = multer.diskStorage({
  // multer调用diskStorage可控制磁盘存储引擎
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload/images"));
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, `${Date.now().toString(16)}.${type}`);
  },
});
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 30 * 1024 * 1024, //文件大小 单位 b
  files: 10, // 文件数量 如果前端上传的文件数量大于这个数 会包 'Too many files'
};

const upload = multer({
  storage,
  limits,
});

router.prefix("/file");
router.post("/uploadFile", upload.single("file"), async (ctx, next) => {
  ctx.body = {
    code: 100,
    message: "上传成功",
  };
});

router.post(
  "/uploadFiles",
  upload.fields([{ name: "files", maxCount: 10 }]),
  async (ctx, next) => {
    // post参数
    let postParam = ctx.request.body;
    if (!postParam.Uid) {
      ctx.body = {
        code: 101,
        message: "缺少参数",
      };
      return;
    }
    let pathArr = [];
    for (let i = 0; i < ctx.files.files.length; i++) {
      let path = "upload/images/" + ctx.files.files[i].filename;
      pathArr.push(path);
    }
    let UFTime = now.backNow();
    let obj = {
      UFName: postParam.Uid,
      UFTime,
      UFPath: JSON.stringify(pathArr),
    };
    await DB.insertFile(obj).then((res) => {
      ctx.body = {
        code: 100,
        message: "上传成功",
        path: pathArr,
      };
    });
  }
);

module.exports = router;
