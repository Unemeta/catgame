import React from "react";
import styles from "@/styles/EntryItem.module.css"; // 确保有对应的 CSS 文件

export default function EntryItem() {
  return (
    <div  className={styles.container}>
      <div className={styles.entryItem}>
        <img src="./img/hi.png" alt="" className={styles.entryItemImg}/>
      </div>
      <div className={styles.entryItemText}> Mood Notes</div>
    </div>
  );
}
