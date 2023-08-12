// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export let messages = [];

export default function handler(req, res) {
  // 如果是get
  if (req.method === "GET") {
    // 返回数据
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ message: "success", data: messages });
    return;
  } else if (req.method === "POST") {
    // 如果是post
    // 把信息存入内存
    if (req.body !== undefined || req.body !== null) messages.push(req.body);

    // 保活处理
    setInterval(() => {
        messages = messages;
    }, 1000 * 60 * 60 * 24 * 7); 

    // 返回成功
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ message: "success" });
  }
}
