// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// get_log.js
import { log } from "./push";
export default function handler(req, res) {
    // 返回 log 中的数据
    const data = log;
    // 返回数据
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ message: "success", data: data });
  }
  