import React, { useState } from "react";
// import ReactPlayer from "react-player";
import styles from "@/styles/VideoBackground.module.css"; // 确保有对应的 CSS 文件
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const videoList = [
  "/videos/video1.mp4",
  "/videos/video4.mp4",
];

export default function VideoBackground() {
  const [videoUrl, setVideoUrl] = useState(videoList[0]);

  return (
    <div className={styles.videoContainer}>
      {/* 背景视频 */}
      <ReactPlayer
        url={videoUrl}
        playing
        loop
        muted
        width="100vw"
        height="100vh"
        style={{ objectFit: "fill", width: "100%", height: "100%" }}
        // className={styles.video}
      />

      {/* 交互层 */}
      <div className={styles.overlay}>
        <button
          className={styles.button}
          onClick={() => setVideoUrl(videoList[1])}
        >
          切换视频 1
        </button>
        {/* <button
          className={styles.button}
          onClick={() => setVideoUrl(videoList[2])}
        >
          切换视频 2
        </button> */}
        <button
          className={styles.button}
          onClick={() => setVideoUrl(videoList[0])}
        >
          切换视频 0
        </button>
      </div>
    </div>
  );
}
