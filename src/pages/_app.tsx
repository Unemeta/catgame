import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "react-photo-view/dist/react-photo-view.css";
import "../i18n/configs";
import { useTranslation } from "react-i18next";

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
  // const [isPortrait, setIsPortrait] = useState(false);
  const [isvertical, setisvertical] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOrientation = () => {
      // setIsPortrait(window.innerHeight > window.innerWidth);
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

  useEffect(() => {
    function setFullHeight() {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    window.addEventListener("resize", setFullHeight);
    window.addEventListener("load", setFullHeight);
  }, []);
  useEffect(() => {
    const language = localStorage.getItem("locale");
    if(language){
      i18n.changeLanguage(language);
    }
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
      {process.env.NEXT_PUBLIC_VERTICAL === "true" && isvertical ? (
        <div className="rotate-screen">请旋转设备至竖屏模式</div>
      ) : (
        <>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </>
      )}
    </>
  );
}
