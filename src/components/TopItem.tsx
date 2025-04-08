/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/TopItem.module.css"; // 确保有对应的 CSS 文件
import CountUp from "react-countup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TopItem({ imgUrl, number, label }: any) {
  return (
    <div className={styles.itemContainer}>
      <img src={imgUrl} alt="" className={styles.itemImage} />
      <div>
        <CountUp end={number} decimal="," className={styles.itemNumber} />
        <div className={styles.itemLabel}>{label}</div>
      </div>
    </div>
  );
}
