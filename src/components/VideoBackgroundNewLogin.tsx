/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";

const videos = [
  "/videos/emotion2_kaixin.mp4",
  "/videos/emotion1_anwei.mp4",
];
export default function VideoBackgroundNewLogin() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
  }, [videoRef]);

  const handleLoadedData = () => {
    console.log("视频加载完成");
    videoRef?.current?.play();
  };

  return (
    <div className={"fixed top-0 left-0 w-[100vw] wrapHeight  z-[-4]"}>
      {/* <img
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
        src="/img/bg/bg_chat2.min.png"
        alt=""
      /> */}
      <video
        muted
        playsInline
        ref={videoRef}
        src={videos[ Math.floor(Math.random() * 2)]}
        autoPlay
        loop
        preload="auto"
        onLoadedData={handleLoadedData}
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
      ></video>
    </div>
  );
}
