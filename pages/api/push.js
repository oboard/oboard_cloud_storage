// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export let memory = {};
export let log = [];

import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req,
  res,
  fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

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

  setInterval(() => {
    log = log;
    memory = memory;
  }, 1000 * 60 * 60 * 24 * 7);

  // 返回成功
  res
    .status(200)
    .setHeader("Access-Control-Allow-Origin", "*")
    .json({ message: "success" });
}
