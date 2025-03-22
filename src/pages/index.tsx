import Head from "next/head";
import styles from '@/styles/home.module.css';
import VideoBackground from "@/components/VideoBackground";
import TopItem from "@/components/TopItem";
import Avatar from "@/components/Avatar"
import FloatingBubbles from "@/components/FloatingBubbles";
import BubbleStats from "@/components/BubbleStats";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to({}, { duration: 3, onUpdate: () => setProgress((p) => (p >= 100 ? 0 : p + 1)) });
  }, []);
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.top}>
        <Avatar></Avatar>
        <TopItem imgUrl="./img/love.svg" label="Affection" number="43"></TopItem>
        <TopItem imgUrl="./img/catfoot.svg" label="Days" number="5"></TopItem>
        <TopItem imgUrl="./img/gold.svg" label="Gold" number="23465"></TopItem>
        <TopItem imgUrl="./img/LostEnergy.svg" label="Crystal" number="243"></TopItem>

        {/* <BubbleStats imageSrc="./img/love.svg" progress={progress}></BubbleStats> */}
        <FloatingBubbles></FloatingBubbles>
        <VideoBackground />
      </div>
    </>
  );
}
