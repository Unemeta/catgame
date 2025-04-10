/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Tips.module.css";
type tipsProp = {
  confirm: (open: boolean) => void;
};
export default function Tips({ confirm }: tipsProp) {
  return (
    <div className={styles.container}>
      <img src="/img/badface.png" alt="" className={styles.icon} />
      <div className={styles.text}>
        Insufficient coins <br></br>Please buy coins at the store
      </div>
      <div className={styles.btn} onClick={() => confirm(false)}>
        Confirm
      </div>
    </div>
  );
}
