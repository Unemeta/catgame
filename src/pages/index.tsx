import Head from "next/head";
import styles from "@/styles/home.module.css";
import VideoBackground from "@/components/VideoBackground";
import TopItem from "@/components/TopItem";
import Avatar from "@/components/Avatar";
import FloatingBubbles from "@/components/FloatingBubbles";
// import BubbleStats from "@/components/BubbleStats";
import Loading from "@/components/Loading";
import EntryItem from "@/components/EntryItem";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loading, setIsLoading] = useState(true);

  // const [loadedResources, setLoadedResources] = useState(0);
  interface Resource {
    type: "image" | "video";
    url: string;
  }
  // 示例资源列表
  const resources: Resource[] = [
    // { type: "image", url: "/path/to/image1.jpg" },
    // { type: "image", url: "/path/to/image2.jpg" },
    { type: "video", url: "/videos/video1.mp4" },
    { type: "video", url: "/videos/video4.mp4" },

    // ... 添加更多资源
  ];

  useEffect(() => {
    let loaded = 0;
    const totalResources = resources.length;

    const updateProgress = () => {
      loaded++;
      const newProgress = (loaded / totalResources) * 100;
      setProgress(newProgress);
      // setLoadedResources(loaded);

      if (loaded === totalResources) {
        // if (newProgress >= 100) {
        //   setTimeout(() => setLoading(false), 300); // 让进度条停留一下再消失
        // }
        setTimeout(() => setIsLoading(false), 300); // 让进度条停留一下再消失
      }
    };

    const loadResource = (resource: Resource) => {
      return new Promise<void>((resolve) => {
        if (resource.type === "image") {
          const img = new Image();
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress(); // 即使加载失败也继续
            resolve();
          };
          img.src = resource.url;
        } else if (resource.type === "video") {
          const video = document.createElement("video");
          video.onloadeddata = () => {
            updateProgress();
            resolve();
          };
          video.onerror = () => {
            updateProgress();
            resolve();
          };
          video.src = resource.url;
          video.load();
        }
      });
    };

    // 并行加载所有资源
    Promise.all(resources.map(loadResource)).catch((error) => {
      console.error("资源加载出错:", error);
      setIsLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   const tl = gsap.timeline({ repeat: -1, yoyo: true });
  //   tl.to(
  //     {},
  //     {
  //       duration: 3,
  //       onUpdate: () => setProgress((p) => (p >= 100 ? 0 : p + 1)),
  //     }
  //   );
  // }, []);
  return (
    <>
      <Head>
        <title>CatGame Next.js App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
        />
      </Head>
      {loading ? (
        <Loading progress={progress} />
      ) : (
        <div className={styles.top}>
          <Avatar></Avatar>
          <TopItem
            imgUrl="./img/love.svg"
            label="Affection"
            number="43"
          ></TopItem>
          <TopItem imgUrl="./img/catfoot.svg" label="Days" number="5"></TopItem>
          <TopItem
            imgUrl="./img/gold.svg"
            label="Gold"
            number="23465"
          ></TopItem>
          <TopItem
            imgUrl="./img/LostEnergy.svg"
            label="Crystal"
            number="243"
          ></TopItem>

          {/* <BubbleStats imageSrc="./img/love.svg" progress={progress}></BubbleStats> */}
          <FloatingBubbles></FloatingBubbles>
          <VideoBackground />
          <div className={styles.right}>
            <EntryItem></EntryItem>
          </div>
        </div>
      )}
    </>
  );
}
