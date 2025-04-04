/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import styles from "@/styles/EntryItem.module.css"; // 确保有对应的 CSS 文件
import { gsap } from "gsap";

export default function EntryItem() {
  const bubbleRef = useRef<HTMLDivElement>(null);

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
  return (
    <div className={styles.container} ref={bubbleRef}>
      <div className={styles.entryItem}>
        <img src="./img/hi.png" alt="" className={styles.entryItemImg} />
      </div>
      <div className={styles.entryItemText}> Mood Notes</div>
    </div>
  );
}
