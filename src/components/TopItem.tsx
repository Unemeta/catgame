import React from "react";
import styles from "@/styles/TopItem.module.css"; // 确保有对应的 CSS 文件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TopItem({imgUrl,number,label}:any) {
  return (
    <div className={styles.itemContainer}>
      {/* <img src="./img/love.svg" alt="" className={styles.itemImage} /> */}
      <img src={imgUrl} alt="" className={styles.itemImage} />
      <div>
        <div className={styles.itemNumber}>{number}</div>
        <div className={styles.itemLabel}>{label}</div>
      </div>
    </div>
  );
}
