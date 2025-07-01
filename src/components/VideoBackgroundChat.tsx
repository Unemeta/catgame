/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";

const videoUrl = "/videos/test.mp4";
export default function VideoBackgroundChat() {
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
    <div className={"fixed top-0 left-0 w-[100vw] wrapHeight  z-[-1]"}>
      <img
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
        src="/img/bg/bg_chat2.min.png"
        alt=""
      />
      <video
        muted
        playsInline
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        preload="auto"
        onLoadedData={handleLoadedData}
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
      ></video>
    </div>
  );
}
