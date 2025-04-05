import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@/styles/global.css";
// import Router from "next/router";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// // 配置进度条
// NProgress.configure({
//   showSpinner: false,
//   trickleSpeed: 300,
// });

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleOrientation(); // 初始检查
    window.addEventListener("resize", handleOrientation);

    return () => window.removeEventListener("resize", handleOrientation);
  }, []);

  return (
    <>
      {isPortrait ? (
        <div className="rotate-screen">请旋转设备至横屏模式</div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
