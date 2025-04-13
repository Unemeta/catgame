import React, { useEffect, useState } from "react";
import LottieView from "@/components/lottie";
import styles from "@/styles/LoveCollect.module.css"; // 确保有对应的 CSS 文件
import { useFetchUser, useShowLoveCollect } from "@/store";
import BubbleStats from "@/components/BubbleStats";

export default function LoveCollect() {
  const { userData } = useFetchUser();
  const [showLove, setShowLove] = useShowLoveCollect();
  const [progress, setProgress] = useState(userData.nowExpPercent);
  useEffect(() => {
    // 展示爱心动画收集后，需要对lottie元素隐藏，并且再做经验值更新的操作
    if (showLove) {
      setTimeout(() => {
        setShowLove(false);
        setProgress(userData.nowExpPercent);
      }, 3000);
    }else{
      // 数据初始化或者刷新数据时不用做延迟
      setProgress(userData.nowExpPercent);
    }
  }, [showLove, setShowLove, userData.nowExpPercent]);

  return (
    <>
      <BubbleStats
        imageSrc="./img/love.svg"
        progress={Number((progress * 100).toFixed())}
      ></BubbleStats>
      {showLove ? (
        <LottieView
          src={"/lottie/lovingheart.json"}
          className={styles.loveCollect}
        ></LottieView>
      ) : (
        <></>
      )}
    </>
  );
}
