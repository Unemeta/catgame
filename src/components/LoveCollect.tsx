import React, { useEffect } from "react";
import LottieView from "@/components/lottie";
import styles from "@/styles/LoveCollect.module.css"; // 确保有对应的 CSS 文件
import { useFetchUser, useShowLoveCollect } from "@/store";
import BubbleStats from "@/components/BubbleStats";

export default function LoveCollect() {
  const { userData } = useFetchUser();
  const [showLove, setShowLove] = useShowLoveCollect();
  useEffect(() => {
    if (showLove) {
      setTimeout(() => {
        setShowLove(false);
      }, 3000);
    }
  }, [showLove, setShowLove]);
  return (
    <>
      <BubbleStats
        imageSrc="./img/love.svg"
        progress={userData.nowExpPercent * 100}
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
