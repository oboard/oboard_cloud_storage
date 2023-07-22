import Image from "next/image";
import React from "react";

export default function Home() {
  // 读取./log.json的内容，调用接口get_log.js
  const [log, setLog] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/get_log")
      .then((res) => res.json())
      .then((res) => {
        // 将log存入state
        setLog(res.data);
      });
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {/* 标题 */}
      <h1 className={`text-4xl font-bold`}>oboard临时储存云</h1>
      {/* 展示log列表，使用daisyui */}
      <div className={`w-full mt-8`}>
        <table className={`table w-full`}>
          <thead>
            <tr>
              <th>key</th>
              <th>value</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {log.map((item) => (
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item.value}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 用于添加的表单 */}
      <div className={`w-full mt-8`}>
        <div className={`flex flex-col`}>
          <label htmlFor="key">key</label>
          <input
            type="text"
            id="key"
            className={`input input-bordered`}
            placeholder={`key`}
          />
        </div>
        <div className={`flex flex-col mt-4`}>
          <label htmlFor="value">value</label>
          <input
            type="text"
            id="value"
            className={`input input-bordered`}
            placeholder={`value`}
          />
        </div>
      </div>

      {/* 按钮 */}
      <div className={`w-full mt-8`}>
        <button
          className={`btn btn-primary w-full`}
          onClick={() => {
            // 获取key和value
            const key = document.getElementById("key").value;
            const value = document.getElementById("value").value;
            // 调用接口push.js
            fetch("/api/push", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "key": key,
                "value": value
                }),
              })
              .then((res) => res.json())
              .then((res) => {
                // 重新获取log
                fetch("/api/get_log")
                  .then((res) => res.json())
                  .then((res) => {
                    // 将log存入state
                    setLog(res.data);
                    // 清空表单
                    document.getElementById("key").value = "";
                    document.getElementById("value").value = "";

                  });
              });
          }}
        >
          保存
        </button>
      </div>
    </main>
  );
}
