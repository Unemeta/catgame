import React, { useState, useRef } from "react";
// import ReactPlayer from "react-player";
import styles from "@/styles/VideoBackground.module.css"; // 确保有对应的 CSS 文件
// import dynamic from "next/dynamic";
// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const videoList = ["/videos/video1.mp4", "/videos/video4.mp4"];

export default function VideoBackground() {
  const [videoUrl, setVideoUrl] = useState(videoList[0]);
  const [nextVideoSrc, setNextVideoSrc] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (newSrc: string) => {
    if (newSrc === videoUrl) return; // 避免重复切换
    setNextVideoSrc(newSrc); // 预加载新视频
  };

  const handleCanPlay = () => {
    console.log("handleCanPlay");
    setVideoUrl(nextVideoSrc); // 当新视频可以播放时，正式切换
    // debugger;
    setNextVideoSrc(""); // 清除预加载视频
  };
  return (
    <div className={styles.videoContainer}>
      {/* 背景视频 */}
      {/* <ReactPlayer
        url={videoUrl}
        playing
        loop
        muted
        width="100vw"
        height="100vh"
        style={{ objectFit: "fill", width: "100%", height: "100%" }}
        // className={styles.video}
      /> */}

      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        src={videoUrl}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        {/* <source src={videoUrl} type="video/mp4" key={videoUrl} /> */}
      </video>

      {/* 预加载的视频（不显示）*/}
      {nextVideoSrc && (
        <video
          muted
          playsInline
          style={{
            visibility: "hidden",
          }}
          onLoadedData={handleCanPlay} // 当可以播放时，才切换
          src={nextVideoSrc}
        >
          {/* <source src={nextVideoSrc} type="video/mp4" key={nextVideoSrc} /> */}
        </video>
      )}
      {/* 交互层 */}
      <div className={styles.overlay}>
        <button
          className={styles.button}
          onClick={() => handleVideoChange(videoList[1])}
        >
          切换视频 1
        </button>
        <button
          className={styles.button}
          onClick={() => handleVideoChange(videoList[0])}
        >
          切换视频 0
        </button>
      </div>
    </div>
  );
}
