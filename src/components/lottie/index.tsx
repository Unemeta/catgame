/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from "react";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false } // 👈 禁用 SSR，只在客户端加载
);
import { cn } from "@/lib/utils";

const LottieView = forwardRef(({ src, className, ...props }: any, ref) => {
  const LottieViewRef = useRef<any>(null);
  const [speed, setSpeed] = useState<number>(1);
  const [instance, setInstance] = useState<any>(null);

  useImperativeHandle(ref, () => ({
    speed: (val: number) => {
      console.log(val);
      setSpeed(val);
      if (instance) {
        instance.speed = 10;
      }
    },
  }));
  return (
    <LottiePlayer
      lottieRef={(instance) => {
        setInstance(instance); // the lottie instance is returned in the argument of this prop. set it to your local state
      }}
      className={cn("", className)}
      autoplay
      src={src}
      speed={speed}
      ref={LottieViewRef}
      {...props}
    ></LottiePlayer>
  );
});
LottieView.displayName = "LottieView";
export default LottieView;
