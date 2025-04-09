/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from ".";

const videoUrl = "/videos/video.mp4";

interface iDialogShop {
  trigger?: ReactNode;
  playEnd: () => void;
}
const DialogPlay = ({ trigger, playEnd }: iDialogShop) => {
  const [isOpen, setIsOpen] = useState(false);
  const refVideo = useRef(null);

  useEffect(() => {
    const handleEnded = () => {
      playEnd?.();
      setIsOpen(false);
    };
    if (isOpen) {
      setTimeout(() => {
        const videoElement = refVideo.current;
        if (videoElement) {
          (videoElement as any).addEventListener("ended", handleEnded);
        }
      }, 1000);
    }

    // 清理事件监听器
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const videoElement = refVideo?.current;
      if (videoElement) {
        (videoElement as any)?.removeEventListener("ended", handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, refVideo]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 w-[100vw] h-[100vh] overflow-hidden max-w-[100vw]">
        <div className="w-full h-full relative">
          <video
            ref={refVideo}
            autoPlay
            muted
            playsInline
            src={videoUrl}
            preload="auto"
            className="w-full h-full object-cover"
          ></video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPlay;
