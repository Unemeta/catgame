import React, { useState, useRef } from "react";
import styles from "@/styles/VideoBackground.module.css"; // 确保有对应的 CSS 文件
const videoList = ["/videos/video1.mp4", "/videos/video4.mp4"];

export default function VideoBackground() {
  const [videoUrl, setVideoUrl] = useState(videoList[0]);
  const [nextVideoSrc, setNextVideoSrc] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (newSrc: string) => {
    if (newSrc === videoUrl) return; // 避免重复切换
    // setNextVideoSrc(newSrc); // 预加载新视频
    setVideoUrl(newSrc)
  };

  const handleCanPlay = () => {
    console.log("handleCanPlay");
    setVideoUrl(nextVideoSrc); // 当新视频可以播放时，正式切换
    setNextVideoSrc(""); // 清除预加载视频
  };
  return (
    <div className={styles.videoContainer}>
      {/* 背景视频 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        src={videoUrl}
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        {/* <source src={videoUrl} type="video/mp4"/> */}
      </video>

      {/* 预加载的视频（不显示）*/}
      {/* {nextVideoSrc && (
        <video
          muted
          playsInline
          style={{
            visibility: "hidden",
          }}
          onLoadedData={handleCanPlay} // 当可以播放时，才切换
          src={nextVideoSrc}
        >
          <source src={nextVideoSrc} type="video/mp4" key={nextVideoSrc} />
        </video>
      )} */}
      {/* 交互层 */}
      <div className={styles.overlay}>
        <button
          className={styles.button}
          onClick={() => handleVideoChange(videoList[1])}
        >
          切换动画 1
        </button>
        <button
          className={styles.button}
          onClick={() => handleVideoChange(videoList[0])}
        >
          切换动画 0
        </button>
      </div>
    </div>
  );
}
