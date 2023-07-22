// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // 解析请求中的body，body中有key和value两个值
  const { key, value } = req.body;
  // 将key和value存入本地文件，使用fs模块
  const fs = require("fs");
  // 将字符串写入本地文件
  // md5加密key
  const crypto = require("crypto");
  const md5 = crypto.createHash("md5");
  // data文件夹可能不存在，需要创建
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }
  fs.writeFileSync( "./data/" + md5.update(key).digest("hex") + ".txt", value);
  
  // 写入log.json，这个文件有可能不存在
  // 读取log.json
  let log = [];
  try {
    log = JSON.parse(fs.readFileSync("./data/log.json"));
  } catch (error) {
    // 如果文件不存在，就创建一个空数组
    log = [];
  }
  // 将key和value，储存日期时间存入log
  const shortValue =
    value.length > 10
      ? value.toString().slice(0, 10) + "..."
      : value.toString();
  log.push({
    key: key,
    value: shortValue,
    time: new Date().toLocaleString(),
  });
  // 将log写入log.json
  console.log(log);
  fs.writeFileSync("./log.json", JSON.stringify(log));

  // 返回成功
  res
    .status(200)
    .setHeader("Access-Control-Allow-Origin", "*")
    .json({ message: "success" });
}
