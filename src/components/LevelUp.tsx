import React from "react";
import LottieView from "@/components/lottie";
import styles from "@/styles/LevelUp.module.css"; // 确保有对应的 CSS 文件
import { cn } from "@/lib/utils";

export default function LevelUp() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>🎉Congratulations</div>
      {/* <div className={styles.level}>LV.10</div> */}
      <LottieView
        src={"/lottie/update.json"}
        className={styles.animate}
      ></LottieView>
      <div className={styles.content}>Affection Level up to Lv. 10</div>

      <div
        className={cn(
          "bgConfirmBtn cursor-pointer select-none dw266 dh80  flex justify-center items-center",
          styles.btn
        )}
      >
        {/* Confirm */}
      </div>
    </div>
  );
}
