/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Avatar.module.css"; // 确保有对应的 CSS 文件

export default function Avatar(props: { nickname: string; avatar: string }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={props.avatar} />
      <div className={styles.name}>{props.nickname}</div>
    </div>
  );
}
