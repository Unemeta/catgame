/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
// import * as globalApi from "@/services/global";
import mixpanel from '@/utils/mixpanel'

const videos = {
  zh: "https://oss.meowster.io/une_cat_world/animate1-zh.mp4",
  en: "https://oss.meowster.io/une_cat_world/animate1-en.mp4",
  ja: "https://oss.meowster.io/une_cat_world/animate1-ja.mp4",
};
export default function VideoBackgroundNewLoginStart({
  playEnd,
}: {
  playEnd: () => void;
}) {
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false); // 初始静音

  useEffect(() => {
    // This code runs only on the client side
    const key = localStorage.getItem("locale") || "en"; // default to 'en' if not found
    setVideoSrc(videos[key as keyof typeof videos] || videos.en);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
  }, [videoRef]);

  const handleLoadedData = () => {
    console.log("视频加载完成");
    videoRef?.current?.play();
    // globalApi.eventRecord("intro_animation_load");
    mixpanel.track("intro_animation_load");

  };
  const handleVideoEnd = () => {
    console.log("视频播放完成");
    // globalApi.eventRecord("intro_animation_complete");
    mixpanel.track("intro_animation_complete");


    playEnd();
    // 在这里添加播放完成后的逻辑
    // 例如：
    // 1. 重新播放视频
    // videoRef.current?.play();

    // 2. 切换到下一个视频
    // 3. 触发其他组件状态变化
  };
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };
  return (
    <div className={"fixed top-0 left-0 w-[100vw] wrapHeight  z-[-4]"}>
      {/* 静音切换按钮 */}
      <div
        onClick={toggleMute}
        className="absolute top-4 right-4 bg-[#33150099] rounded-[50%] z-1000 w-[4rem] h-[4rem] flex justify-center items-center cursor-pointer"
      >
        {isMuted ? <img
          src="/img/jy.png"
          alt=""
          className="w-[2rem] h-[2rem] "
        /> : <img
          src="/img/yy.png"
          alt=""
          className="w-[2rem] h-[2rem] "
        />}
      </div>
      <video
        playsInline
        ref={videoRef}
        src={videoSrc}
        autoPlay
        preload="auto"
        onLoadedData={handleLoadedData}
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover"
      ></video>
    </div>
  );
}
