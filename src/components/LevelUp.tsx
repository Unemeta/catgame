import React from "react";
import LottieView from "@/components/lottie";
import styles from "@/styles/LevelUp.module.css"; // 确保有对应的 CSS 文件
import { cn } from "@/lib/utils";
import {
  useFetchUser,
  useShowLevelUp,
  useRewardDiaOpenByLevelup,
  useRewardsDia,
} from "@/store";

const LevelUp = () => {
  const { userData } = useFetchUser();
  const [showLevelUp, setShowLevelUp] = useShowLevelUp();
  const [, setRewardsDia] = useRewardsDia();
  const [rewardDiaOpenByLevelup, setRewardDiaOpenByLevelup] =
    useRewardDiaOpenByLevelup();
  const btnClick = () => {
    if (rewardDiaOpenByLevelup) {
      setRewardsDia(true);
      setRewardDiaOpenByLevelup(false);
    }
    setShowLevelUp(false);
  };
  return showLevelUp ? (
    <div className={styles.container}>
      <div className={styles.title}>🎉Congratulations</div>
      <LottieView
        src={"/lottie/update.json"}
        className={styles.animate}
        loop={true}
      ></LottieView>
      <div className={cn("flex flex-col items-center", styles.levelArr)}>
        <img src="/img/levelArrow.svg" alt="" className={styles.levelImg} />
        <div className={styles.levelContent}>
          Lv. {userData?.totalLevel || 0}
        </div>
      </div>
      <div
        className={cn(
          "bgConfirmBtn cursor-pointer select-none dw266 dh80  flex justify-center items-center z-100",
          styles.btn
        )}
        onClick={btnClick}
      >
        {/* Confirm */}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default LevelUp;
