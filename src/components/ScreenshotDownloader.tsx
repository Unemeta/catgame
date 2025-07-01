/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const ScreenshotDownloader = ({ targetRef, fileName = "screenshot" }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState("png");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const downloadScreenshot = async () => {
    if (!targetRef.current) {
      setError("未找到目标元素");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPreviewUrl(null);

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      const dataUrl =
        format === "png"
          ? canvas.toDataURL("image/png")
          : canvas.toDataURL("image/jpeg", 0.9);

      const link = document.createElement("a");
      link.download = `${fileName}-${new Date()
        .toISOString()
        .slice(0, 10)}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("截图失败:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      onClick={downloadScreenshot}
    >
      <img
        className="w-[3.6rem] h-[3.6rem]"
        src="/img/letter_downld.png"
        alt=""
      />
      <div className="h-[0.6rem]"></div>
      <span className="text-[#6C4937] text-[1.4rem] font-[500]">Download</span>
    </div>
  );
};

export default ScreenshotDownloader;
