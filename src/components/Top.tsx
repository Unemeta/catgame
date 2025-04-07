import React from "react";
import TopItem from "@/components/TopItem";
import Avatar from "@/components/Avatar";
import styles from "@/styles/Top.module.css";
import { useFetchUser } from "@/store";

export default function Top() {
  const { userData } = useFetchUser();

  return (
    <div className={styles.top}>
      <Avatar avatar={userData.avatar} nickname={userData.nickname}></Avatar>
      <TopItem
        imgUrl="./img/love.svg"
        label="Affection"
        number={userData.nowExpPercent * 100}
      ></TopItem>
      {/* <TopItem imgUrl="./img/catfoot.svg" label="Days" number="5"></TopItem> */}
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
