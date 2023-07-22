// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// get_log.js
export default function handler(req, res) {
    // 返回 log.json 中的数据
    const fs = require("fs");
    let data = [];
    try {
        data = JSON.parse(fs.readFileSync("./log.json"));
    } catch (error) {
        // 如果文件不存在，就创建一个空数组
        data = [];
    }
    
    // 返回数据
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ message: "success", data: data });
  }
  