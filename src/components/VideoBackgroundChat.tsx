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

  return (
    <div className={"fixed top-0 left-0 w-[100vw] wrapHeight  z-[-1]"}>
      <video
        muted
        playsInline
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        preload="auto"
        className="absolute top-0 left-0 w-[100%] object-cover"
      ></video>
    </div>
  );
}
