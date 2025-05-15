/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import VideoBackground from "@/components/VideoBackground";
import Top from "@/components/Top";

import FloatingBubbles from "@/components/FloatingBubbles";
import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";
import NavRight from "@/components/navRight";
import { request } from "@/utils/request";
import DialogFood from "@/components/dialog/food";
import LevelUp from "@/components/LevelUp";
import { Tabs } from "@/types";
import { useShowLevelUp, useFetchUser, usePlayItemId } from "@/store";
import LoveCollect from "@/components/LoveCollect";
import Rewards from "@/components/dialog/rewards";
import DialogChatView from "@/components/dialog/chat";
import TalkSelect from "@/components/dialog/talkselect";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { fetchUser } = useFetchUser();
  const [showLevelUp] = useShowLevelUp();
  const [progress, setProgress] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [foodTabs, setFoodTabs] = useState<Tabs>({
    food: { unlocked: false, goods: [] },
  });
  const [playItemId] = usePlayItemId();
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
    { type: "image", url: "/img/bg/shop.min.png" },
    { type: "image", url: "/img/bg/shopCtt.min.png" },
    { type: "image", url: "/img/bg/shopNavLeft.min.png" },
    { type: "image", url: "/img/bg/shopNavUnselected.min.png" },
    { type: "video", url: "/videos/video.mp4" },

    // ... 添加更多资源
  ];

  const feedingInfo = async () => {
    const { data } = await request({
      url: "/api/cat/v1/shop/feeding/info",
      method: "get",
    });
    console.log(data);
    setFoodTabs(data);
  };
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERTICAL === "true") {
      router.push("/chat");
      return;
    }
    if (typeof window === "undefined") return;

    let loaded = 0;
    const totalResources = resources.length;

    const updateProgress = () => {
      loaded++;
      const newProgress = (loaded / totalResources) * 100;
      setProgress(Number(newProgress.toFixed(1)));
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
    fetchUser();

    let deferredPrompt: any;

    const handler = (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      // 你可以存储这个变量并在按钮点击时调用 deferredPrompt.prompt()
    };

    window.addEventListener("beforeinstallprompt", handler);
    if (typeof window !== 'undefined') {
      import('eruda').then((eruda) => eruda.default.init());
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  return (
    <>
      {loading ? (
        <Loading progress={progress} />
      ) : (
        <div className="main">
          <Top></Top>
          <FloatingBubbles></FloatingBubbles>
          <LevelUp></LevelUp>
          <LoveCollect></LoveCollect>
          <DialogFood
            title="Food"
            tabs={foodTabs}
            trigger={
              <div className="dw180 h-auto dmb10 fixed bottom-[20px] left-[150px] z-1">
                <img src="/img/bowlfood.png" alt="" />
              </div>
            }
          ></DialogFood>
          {/* <DialogChatView
            trigger={
              <div className="fixed top-[53%] left-[42%] translate-[-50%] z-1 cursor-pointer">
                <img
                  className="dw116 h-auto dmb10"
                  src="/img/chat.min.png"
                  alt=""
                />
              </div>
            }
          ></DialogChatView> */}
          <div
            className="fixed top-[53%] left-[42%] translate-[-50%] z-1 cursor-pointer"
            onClick={() => {
              router.push("/chat");
            }}
          >
            <img
              className="dw116 h-auto dmb10"
              src="/img/chat.min.png"
              alt=""
            />
          </div>
          <NavRight></NavRight>
          <VideoBackground />
          {playItemId ? <Rewards id={playItemId}></Rewards> : <></>}
          <TalkSelect></TalkSelect>
        </div>
      )}
    </>
  );
}
