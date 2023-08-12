// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export let messages = [];

export default function handler(req, res) {
  // 如果是get
  if (req.method === "GET") {
    // 如果超过100条，删除一百条以外的
    if (messages.length > 100) messages = messages.slice(0, 100);

    // 返回数据
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ message: "success", data: messages });
    return;
  } else if (req.method === "POST") {
    // 如果是post
    // 把信息存入内存
    // body是messages
    console.log(req.body)
    messages = [...messages, ...req.body]
    // 要通过比对uuid来判断是否重复
    messages = messages.filter((item, index, arr) => {
        return arr.findIndex((item2) => item2.id === item.id) === index;
    })
    
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
