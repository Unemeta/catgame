import React from "react";
import styles from "@/styles/Avatar.module.css"; // 确保有对应的 CSS 文件

export default function Avatar() {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src="./img/avatarTest.png" />
      <div className={styles.name}>Alice</div>
    </div>
  );
}
