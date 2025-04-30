/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import React from "react";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false } // 👈 禁用 SSR，只在客户端加载
);
import { cn } from "@/lib/utils";

const LottieView = ({ src, className, ...props }: any) => {
  // const [instance, setInstance] = useState<any>(null);

  return (
    <LottiePlayer
      // lottieRef={(instance) => {
      //   setInstance(instance); // the lottie instance is returned in the argument of this prop. set it to your local state
      // }}
      className={cn("", className)}
      autoplay
      src={src}
      {...props}
    ></LottiePlayer>
  );
};
export default LottieView;
