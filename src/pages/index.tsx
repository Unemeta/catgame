/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "@/styles/home.module.css";
import VideoBackground from "@/components/VideoBackground";
import Top from "@/components/Top";

import FloatingBubbles from "@/components/FloatingBubbles";
import BubbleStats from "@/components/BubbleStats";
import Loading from "@/components/Loading";

import React, { useEffect, useState } from "react";
import NavRight from "@/components/navRight";
import LottieView from "@/components/lottie";
import { request } from "@/utils/request";
import DialogFood from "@/components/dialog/food";
import Login from "@/components/Login";
import LevelUp from "@/components/LevelUp";
import { Tabs } from "@/types";
export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [foodTabs, setFoodTabs] = useState<Tabs>({
    food: { unlocked: false, goods: [] },
  });
  // const [loadedResources, setLoadedResources] = useState(0);
  interface Resource {
    type: "image" | "video";
    url: string;
  }
  // 示例资源列表
  const resources: Resource[] = [
    // { type: "image", url: "/path/to/image1.jpg" },
    { type: "image", url: "/img/1.jpg" },
    { type: "image", url: "/img/2.jpg" },
    { type: "image", url: "/img/3.jpg" },
    { type: "image", url: "/img/4.jpg" },
    { type: "image", url: "/img/5.jpg" },
    { type: "image", url: "/img/6.jpg" },
    { type: "video", url: "/videos/video.mp4" },

    // ... 添加更多资源
  ];

  const feedingInfo = async () => {
    const { data } = await request({
      url: "/cat/v1/shop/feeding/info",
      method: "get",
    });
    console.log(data);
    setFoodTabs(data);
  };
  useEffect(() => {
    if (typeof window === "undefined") return;

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

    feedingInfo();
  }, []);
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
        <div>
          <Top></Top>
          <BubbleStats
            imageSrc="./img/love.svg"
            progress={progress}
          ></BubbleStats>
          <FloatingBubbles></FloatingBubbles>
          <VideoBackground />
          <LottieView
            src={"/lottie/lovingheart.json"}
            className={styles.loveCollect}
          ></LottieView>
          <DialogFood
            title="Food"
            tabs={foodTabs}
            trigger={
              <div className="dw116 h-auto dmb10 fixed bottom-[20px] left-[150px]">
                <img src="/img/food.png" alt="" />
              </div>
            }
          ></DialogFood>
          <NavRight></NavRight>
          <Login></Login>
          {/* <LevelUp></LevelUp> */}
        </div>
      )}
    </>
  );
}
