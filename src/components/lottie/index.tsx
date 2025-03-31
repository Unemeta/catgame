/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Player } from "@lottiefiles/react-lottie-player";
import { cn } from "@/lib/utils";

interface iLottieView {
  src: any;
  className?: string;
}
const LottieView = ({ src, className }: iLottieView) => {
  return (
    <Player className={cn("", className)} autoplay loop src={src}></Player>
  );
};
export default LottieView;
