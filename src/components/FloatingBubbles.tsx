import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FloatingBubbles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesCount = 15; // 泡泡数量

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;


    // 创建泡泡元素
    const bubbles = Array.from({ length: bubblesCount }).map(() => {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      containerRef.current?.appendChild(bubble);
      return bubble;
    });

    // 动画时间线
    const tl = gsap.timeline({ repeat: -1 }); // 无限循环

    bubbles.forEach((bubble) => {
      // 随机参数
      const startX = Math.random() * window.innerWidth;
      const endX = startX + (Math.random() - 0.5) * 100; // 横向偏移
      const duration = 3 + Math.random() * 4; // 持续时间 3-7 秒
      const scale = 0.2 + Math.random() * 0.8; // 缩放比例
      const delay = Math.random() * 2; // 随机延迟

      // 初始样式
      gsap.set(bubble, {
        x: startX,
        y: window.innerHeight + 100,
        scale: 0,
        opacity: 0,
      });

      // 浮动动画
      tl.to(
        bubble,
        {
          duration,
          delay,
          y: -100,
          x: endX,
          scale,
          opacity: 0.6,
          ease: "power1.inOut",
        },
        0
      ).to(
        bubble,
        {
          duration: 0.5,
          scale: 0,
          opacity: 0,
          ease: "power2.in",
        },
        `-=${0.5}`
      );
    });

    // 清理函数
    return () => {
      bubbles.forEach((bubble) => bubble.remove());
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    />
  );
};
export default FloatingBubbles;