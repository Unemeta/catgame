/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";

interface iVideoBackgroundEmotion {
  index: number;
  playEnd: () => void;
}
const videos = [
  "/videos/emotion0_wuliao.mp4",
  "/videos/emotion1_anwei.mp4",
  "/videos/emotion2_kaixin.mp4",
  "/videos/emotion3_kongju.mp4",
  "/videos/emotion4_shangxin.mp4",
  "/videos/emotion5_shengqi.mp4",
];
export default function VideoBackgroundEmotion({
  index,
  playEnd,
}: iVideoBackgroundEmotion) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [indexVideo, setindexVideo] = useState<number>(0);

  useEffect(() => {
    if (index != null) {
      setindexVideo(index);
    }
  }, [index]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
  }, [videoRef]);

  const handleLoadedData = () => {
    console.log("视频加载完成");
    videoRef?.current?.play();
  };

  useEffect(() => {
    const handleEnded = () => {
      console.log("play end");
      playEnd?.();
    };
    if (videoRef) {
      setTimeout(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (videoElement as any).addEventListener("ended", handleEnded);
        }
      }, 1000);
    }

    // 清理事件监听器
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const videoElement = videoRef?.current;
      if (videoElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (videoElement as any)?.removeEventListener("ended", handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  return (
    <div className={"fixed top-0 left-0 w-[100vw] wrapHeight  z-[-1]"}>
      {/* <img
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
        src="/img/bg/bg_chat2.min.png"
        alt=""
      /> */}
      <video
        muted
        playsInline
        ref={videoRef}
        src={videos[indexVideo]}
        autoPlay
        preload="auto"
        onLoadedData={handleLoadedData}
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
      ></video>
    </div>
  );
}
