// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// get.js
import { memory } from "./push";
export default function handler(req, res) {
  // 解析请求中的body，body中有key值
  const { key } = req.body;
  // 从内存中取出key对应的value
  const data = memory[key];
  // 返回数据
  res
    .status(200)
    .setHeader("Access-Control-Allow-Origin", "*")
    .json({ message: "success", data: data.toString() });
}
