import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

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
  const [isvertical, setisvertical] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setisvertical(window.innerHeight < window.innerWidth);
      const top = getComputedStyle(document.documentElement).getPropertyValue(
        "--safe-area-inset-top"
      );
      document.body.style.paddingTop = top;
    };

    handleOrientation(); // 初始检查
    window.addEventListener("resize", handleOrientation);

    return () => window.removeEventListener("resize", handleOrientation);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {/* {isPortrait && false ? (
        <div className="rotate-screen">请旋转设备至横屏模式</div>
      ) : (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )} */}
       {process.env.NEXT_PUBLIC_vertical === "true" && isvertical ? (
        <div className="rotate-screen">请旋转设备至竖屏模式</div>
      ) : (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  );
}
