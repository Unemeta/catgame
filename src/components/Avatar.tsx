/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Avatar.module.css"; // 确保有对应的 CSS 文件

export default function Avatar(props: { nickname: string; avatar: string, level:number }) {
  const enterFullscreen = () => {
    if (typeof window === "undefined") return;
    const elem = document.documentElement; // 选择整个网页
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };
  return (
    <>
      <div className="relative">
        <div className={styles.level}>{props.level}</div>
        <div className={styles.container} onClick={enterFullscreen}>
          <img className={styles.avatar} src={props.avatar} />
          <div className={styles.name}>{props.nickname}</div>
        </div>
      </div>
    </>
  );
}
