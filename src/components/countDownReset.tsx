import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

  const getTokyoMidnightTime = () => {
    const now = new Date();
    const utcOffset = 9 * 60; // 东京时区 UTC+9
    const tokyoMidnight = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0,
        0,
        0
      ) -
        utcOffset * 60 * 1000
    );
    return tokyoMidnight;
  };

  const updateCountdown = () => {
    const now = new Date();
    const midnight = getTokyoMidnightTime();
    const timeRemaining = midnight.getTime() - now.getTime();

    if (timeRemaining > 0) {
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      // const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      setTimeRemaining(
        // `${hours}h:${minutes}m ${seconds}s`
        `${hours}h:${minutes}m`
      );
    } else {
      setTimeRemaining("东京0点已到！");
    }
  };

  useEffect(() => {
    updateCountdown(); // 初始更新
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer); // 清理定时器
  }, []);

  return (
    <div>
      <h1>{timeRemaining}</h1>
    </div>
  );
};

export default CountdownTimer;
