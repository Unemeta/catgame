import React, { useEffect, useRef, useState } from "react";
import { formatHourTime } from "@/utils/formatTime";

type CountdownCDProps = {
  duration: number; // 倒计时总时间，单位：秒
  size?: number; // 圆的直径
  strokeColor?: string; // 扇形颜色
  className?: string; // ✅ 新增 className 支持
};

const CountdownCD: React.FC<CountdownCDProps> = ({
  duration,
  size = 60,
  strokeColor = "#000",
  className = "",
}) => {
  const radius = size / 2;
  const [progress, setProgress] = useState(1); // 1 表示满，0 表示结束
  const [remainingTime, setRemainingTime] = useState(duration); // 剩余时间

  const startTimeRef = useRef<number>(Date.now());
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const newProgress = Math.max(0, 1 - elapsed / duration);
      setProgress(newProgress);
      setRemainingTime(Math.max(0, duration - Math.floor(elapsed)));

      if (newProgress > 0) {
        animationRef.current = requestAnimationFrame(update);
      }
    };

    animationRef.current = requestAnimationFrame(update);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [duration]);

  
  // 计算 SVG 扇形路径
  const getPath = () => {
    const angle = progress * 2 * Math.PI;
    const x = radius + radius * Math.sin(angle);
    const y = radius - radius * Math.cos(angle);
    const largeArcFlag = progress > 0.5 ? 1 : 0;

    return `
      M ${radius} ${radius}
      L ${radius} 0
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}
      Z
    `;
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      className={className}
    >
      <svg width={size} height={size} style={{ opacity: "0.6" }}>
        {/* 背景圆 */}
        {/* <circle cx={radius} cy={radius} r={radius} fill="#e0e0e0" /> */}
        {/* 冷却扇形 */}
        {progress > 0 && <path d={getPath()} fill={strokeColor} />}
      </svg>
      {/* 显示剩余时间 */}
      <div
        style={{
          color: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "SF Pro Rounded",
          fontSize: "12px",
        }}
      >
        {formatHourTime(remainingTime)}s
      </div>
    </div>
  );
};

export default CountdownCD;
