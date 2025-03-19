
import type { AppProps } from 'next/app';
import { useEffect, useState } from "react";
import "@/styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleOrientation(); // 初始检查
    window.addEventListener("resize", handleOrientation);
    
    return () => window.removeEventListener("resize", handleOrientation);
  }, []);

  return (
    <>
      {isPortrait && <div className="rotate-screen">请旋转设备至横屏模式</div>}
      <Component {...pageProps} />
    </>
  );
}
