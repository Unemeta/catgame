/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";

const ProgressBar = ({ setShow }: { setShow: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [speed, ] = useState(50); // 毫秒
  const intervalRef = useRef<any>(null);

  // 开始/暂停进度
  const toggleProgress = () => {
    setIsActive(!isActive);
  };

  // 重置进度
  //   const resetProgress = () => {
  //     setIsActive(false);
  //     setProgress(0);
  //     clearInterval(intervalRef.current);
  //   };

  // 更新进度
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 100;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, speed]);

  useEffect(() => {
    toggleProgress();
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setShow();
    }
  }, [progress, setShow]);

  // 改变速度
  //   const changeSpeed = (newSpeed: number) => {
  //     setSpeed(newSpeed);
  //   };

  return (
    <div className="flex items-center flex-col h-[100vh] justify-center">
      <img src="/img/loadingicon.png" alt="" className="mb-[1.8rem]" />
      {/* 进度条容器 */}
      <div className="mb-10 w-[27rem]">
        {/* 进度条轨道 */}
        <div className="relative h-[2.4rem] bg-[#fff] rounded-full shadow-inner">
          {/* 进度条填充 */}
          <div
            className="absolute top-0 left-0 h-full bg-[#ECA89E] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* 移动的图标 */}
            <div
              className="absolute -top-[1.6rem] w-[6rem] h-[6rem] flex items-center justify-center z-1"
              style={{ left: `calc(${progress}% - 1rem)` }}
            >
              <img src="/img/progressicon.svg" alt="" className="w-full" />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-[2.5rem]">
          <div className="text-center justify-start text-[#826662] text-[1.2rem] font-['SF_Pro_Rounded'] leading-none">
            Checking for updates…
          </div>
          <div className="text-center justify-start text-[#EA8273] text-[1.2rem] font-bold font-['SF_Pro_Rounded'] leading-none">
            {progress}%
          </div>
        </div>
      </div>

      {/* 控制面板 */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-blue-300">控制</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={toggleProgress}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isActive ? "暂停" : "开始"}
                </button>
                <button
                  onClick={resetProgress}
                  className="px-5 py-2 rounded-full bg-gray-600 hover:bg-gray-700 font-medium transition-all"
                >
                  重置
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-blue-300">速度</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "慢速", value: 200 },
                  { label: "中速", value: 100 },
                  { label: "快速", value: 50 },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => changeSpeed(item.value)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      speed === item.value
                        ? "bg-purple-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div> */}
    </div>
  );
};

export default ProgressBar;
