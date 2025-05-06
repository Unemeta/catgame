import React from "react";
import { TopItem, TopEx } from "@/components/TopItem";
import Avatar from "@/components/Avatar";
import styles from "@/styles/Top.module.css";
import { useFetchUser } from "@/store";

export default function Top() {
  const { userData } = useFetchUser();

  return (
    <div className={styles.top}>
      <Avatar
        avatar={userData.avatar}
        nickname={userData.nickname}
        level={userData.totalLevel}
      ></Avatar>
      <TopEx
        imgUrl="./img/love.png"
        label="Affection"
        number={userData.nowExp}
        totalNumber={userData.totalLevelTotalExp}
      ></TopEx>
      <TopItem
        imgUrl="./img/gold.svg"
        label="Gold"
        number={userData.coin}
      ></TopItem>
      <TopItem
        imgUrl="./img/LostEnergy.svg"
        label="Crystal"
        number={userData.diamond}
      ></TopItem>
    </div>
  );
}
