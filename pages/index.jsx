// 首页
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // 获取public目录下的图片列表
  const images = require.context("../public/images", true);
  const imageList = images.keys().map((item) => {
    return images(item).default;
  });

  return (
    // 首页
    // 顶部导航栏
    <main className={`flex min-h-screen flex-col items-center justify-between`}>
      {/* 网页Title */}
      <title>oBoard云</title>
      <nav
        className={`navbar mb-2 shadow-lg bg-neutral text-neutral-content fixed top-0 w-full z-10`}
      >
        <div className={`flex-1 hidden px-2 mx-2 lg:flex`}>
          <span className={`text-lg font-bold`}>oBoard云</span>
        </div>
        <div className={`flex-none hidden lg:flex`}>
          <button className={`btn btn-square btn-ghost`}>
            <Link href={`/log`}>日志</Link>
          </button>
        </div>
        <div className={`flex-none`}>
          <button className={`btn btn-square btn-ghost`}>
            <Link href={`/about`}>关于</Link>
          </button>
        </div>
      </nav>

      {/* 主体 */}
      <div className={`flex flex-col items-center justify-between p-24`}>
        {/* 标题 */}
        <h1 className={`text-4xl font-bold`}>图库</h1>

        {/* 展示图片，使用Grid，列数根据屏幕宽度 */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8`}
        >
          {imageList.map((item) => (
            // 有悬浮效果的卡片，使用daisyui
            <div
            // 随机生成的key
              key={Math.random()}
              className="card shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 cursor-pointer"
            >
              {/* // 使用next/image组件 图片填满布局 */}
              <Image alt="image" src={item} sizes="100%" className="h-48 w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
