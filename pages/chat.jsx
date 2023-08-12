import { useEffect, useState } from "react";

// export let messages = [];

// export default function handler(req, res) {
//   // 如果是get
//   if (req.method === "GET") {
//     // 返回数据
//     res
//       .status(200)
//       .setHeader("Access-Control-Allow-Origin", "*")
//       .json({ message: "success", data: messages });
//     return;
//   } else if (req.method === "POST") {
//     // 如果是post
//     // 把信息存入内存
//     if (req.body !== undefined || req.body !== null) messages.push(req.body);

//     // 返回成功
//     res
//       .status(200)
//       .setHeader("Access-Control-Allow-Origin", "*")
//       .json({ message: "success" });
//   }
// }

// 上面是api的代码，下面是页面的代码
export default function Chat() {
  // 使用daisyUI和tailwindcss
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [uuid, setUuid] = useState("");

  // 先生成一个uuid
  let genUuid = () => {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    s[14] = "4";
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
  };

  // 生成uuid
  useEffect(() => {
    setUuid(genUuid());
  }, []);

  // 设置定时拉去信息
  useEffect(() => {
    let timer = setInterval(() => {
      fetch("http://localhost:3000/api/chat")
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.data);
        });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 发送信息
  let sendMessage = () => {
    let time = new Date().toLocaleString();
    let msg = {
      id: uuid,
      content: message,
      time: time,
    };
    // 直接插入到数组中
    messages.push(msg);
    // 发送信息
    fetch("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // 清空输入框
    setMessage("");
  };

  // 信息的结构
  // {
  //     id: "uuid",
  //     content: "message",
  //     time: "time",
  // }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow flex flex-col h-1">
        <div className="flex-grow flex flex-col overflow-y-auto p-4">
          {messages.map((item, index) => (
            // 模仿微信的样式,有气泡的感觉，要显示时间
            // 要根据uuid判断是否是自己发的，如果是自己发的靠右，别人发的靠左
            <div
              key={index}
              className={
                "flex flex-col gap-1 px-2" +
                (item.id === uuid ? " items-end" : " items-start")
              }
            >
              <div
                className={
                  "flex flex-col gap-1" +
                  (item.id === uuid ? " items-end" : " items-start")
                }
              >
                <div
                  className={
                    "rounded-md px-2 py-1" +
                    (item.id === uuid
                      ? " bg-blue-600 text-white"
                      : " bg-gray-200 text-gray-700")
                  }
                >
                  {item.content}
                </div>
                <div className="text-gray-400 text-xs">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 px-2 py-1 flex-shrink-0">
        <input
          className="input input-bordered flex-grow"
          type="text"
          value={message}
          // 回车发送信息
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            sendMessage();
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
}
