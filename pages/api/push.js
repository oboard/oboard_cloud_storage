// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const memory = {};
export const log = [];
export default function handler(req, res) {
  // 解析请求中的body，body中有key和value两个值
  const { key, value } = req.body;
  // 将key和value存入内存
  memory[key] = value;
  
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
  console.log(log);

  // 返回成功
  res
    .status(200)
    .setHeader("Access-Control-Allow-Origin", "*")
    .json({ message: "success" });
}
