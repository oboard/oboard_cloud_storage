// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// get.js
export default function handler(req, res) {
  // 解析请求中的body，body中有key值
  const { key } = req.body;
  // 将key和value存入本地文件，使用fs模块
  const fs = require("fs");
  // 读取本地文件

  const crypto = require("crypto");
  const md5 = crypto.createHash("md5");
  const data = fs.readFileSync(`./data/${md5.update(key).digest("hex")}.txt`);
  // 返回数据
  res
    .status(200)
    .setHeader("Access-Control-Allow-Origin", "*")
    .json({ message: "success", data: data.toString() });
}
