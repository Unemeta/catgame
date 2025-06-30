/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import styles from "@/styles/VideoBackground.module.css"; // 确保有对应的 CSS 文件

const videoUrl = "/videos/chat.mp4";
export default function VideoBackgroundChat() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingSpecial, setIsPlayingSpecial] = useState(false);
  const [isSpecialCompleted, setIsSpecialCompleted] = useState(false);

  const DEFAULT_LOOP = [0, 12] as const;
  const SPECIAL_CLIP = [13, 17.5] as const;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (isPlayingSpecial) {
        // console.log(video.currentTime,'video.currentTime')
        if (video.currentTime >= SPECIAL_CLIP[1]) {
          video.pause();
          setIsPlayingSpecial(false);
          setIsSpecialCompleted(true);
          video.currentTime = DEFAULT_LOOP[0];
          video.play();
        }
      } else {
        // console.log(video.currentTime,'video.DEFAULT_LOOP')
        if (video.currentTime >= DEFAULT_LOOP[1]) {
          video.currentTime = DEFAULT_LOOP[0];
          video?.play();
        }
      }
    };
    video.play();
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isPlayingSpecial]);

  useEffect(() => {
    if (isSpecialCompleted) {
      setIsSpecialCompleted(false);
    }
  }, [isSpecialCompleted]);

  const playSpecialAnimation = () => {
    const video = videoRef.current;
    if (!video || isPlayingSpecial) return;

    video.pause();
    setIsPlayingSpecial(true);
    video.currentTime = SPECIAL_CLIP[0];
    video.play();
  };

  return (
    <div className={styles.videoContainer}>
      {/* 背景视频 */}
      <video
        muted
        playsInline
        ref={videoRef}
        src={videoUrl}
        loop={!isPlayingSpecial}
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        {/* <source src={videoUrl} type="video/mp4"/> */}
      </video>
      {/* 交互层 */}
      <button
        className={styles.active}
        onClick={playSpecialAnimation}
        disabled={isPlayingSpecial}
      >
        {/* {isPlayingSpecial ? "Playing..." : "Play Special Animation"} */}
      </button>
    </div>
  );
}
