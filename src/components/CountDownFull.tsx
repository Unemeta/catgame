import React from "react";
import styles from "@/styles/CountDownFull.module.css";
import { getHours, getMinutes } from "@/utils/formatTime";
type CountdownProps = {
  duration: number; // 倒计时总时间，单位：秒
};
export default function CountDownFull({ duration }: CountdownProps) {
  return (
    <div className={styles.countDownBack}>
      <div className={styles.countDownTitle}>CD Countddown</div>
      <div className={styles.countDownTimeContainer}>
        <div>
          <div className={styles.countDownTime}>{getHours(duration)}</div>
          <div className={styles.timeDes}>Hours</div>
        </div>
        <div className={styles.countDownMid}>:</div>
        <div>
          <div className={styles.countDownTime}>{getMinutes(duration)}</div>
          <div className={styles.timeDes}>Minutes</div>
        </div>
      </div>
    </div>
  );
}
