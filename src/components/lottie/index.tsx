/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false } // 👈 禁用 SSR，只在客户端加载
);
import { cn } from "@/lib/utils";

interface iLottieView {
  src: any;
  className?: string;
  keepLastFrame?: boolean;
  loop?: boolean;
}
const LottieView = ({ src, className, ...props }: iLottieView) => {
  return (
    <LottiePlayer
      className={cn("", className)}
      autoplay
      src={src}
      {...props}
    ></LottiePlayer>
  );
};
export default LottieView;
