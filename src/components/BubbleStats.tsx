/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import styles from "@/styles/BubbleStats.module.css";
const Bubble: React.FC<{ imageSrc: string; progress: number }> = ({
  imageSrc,
  progress,
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // 浮动动画
    gsap.to(bubbleRef.current, {
      y: -10, // 轻微上浮
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // 计算 SVG 进度条偏移
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div
      className={cn("flex items-center justify-center", styles.container)}
      ref={bubbleRef}
    >
      {/* 进度条 */}
      <svg viewBox="0 0 120 120" className={styles.progressContainer}>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#ddd"
          strokeWidth="6"
          opacity="0.3"
        />
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="red"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)" // 旋转起始点
        />
      </svg>

      {/* 泡泡主体 */}
      <div
        className={cn(
          "rounded-full overflow-hidden bg-[url('/img/bubbleBack.png')] bg-no-repeat bg-cover shadow-lg flex items-center justify-center",
          styles.paopao
        )}
      >
        <div className="flex flex-col items-center">
          <img
            src={imageSrc}
            alt=""
            className={cn("w-full h-full object-cover", styles.icon)}
          />
          <div className={styles.text}>{progress}%</div>
        </div>
      </div>
    </div>
  );
};
export default Bubble;
