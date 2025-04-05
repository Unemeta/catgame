/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import styles from "@/styles/VideoBackground.module.css"; // 确保有对应的 CSS 文件

const videoUrl = "/videos/video.mp4";
// const start = 0; // 循环起点
// const end = 5; // 循环终点
// let loopEnabled = false; // 是否启用循环播放

// function toggleLoop() {
//   loopEnabled = !loopEnabled;
//   console.log("循环播放：" + (loopEnabled ? "开启" : "关闭"));
// }

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const enterFullscreen = () => {
    const elem = document.documentElement; // 选择整个网页
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };
  const videoJump = (time: number = 0) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      // 设置循环
      // videoRef.current.addEventListener("timeupdate", () => {
      //   if (loopEnabled && videoRef.current.currentTime >= end) {
      //     videoRef.current.currentTime = start;
      //     videoRef.current.play();
      //   }
      // });
    }
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
      {/* 交互层 */}
      {/* <div className={styles.overlay}>
        <button className={styles.button} onClick={enterFullscreen}>
          点击全屏
        </button>
        <button className={styles.button} onClick={() => videoJump(5)}>
          切换动画 0
        </button>
      </div> */}
    </div>
  );
}
