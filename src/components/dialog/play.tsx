/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from ".";
import DialogTitleView from "./dialogTitle";

const videoUrl = "/videos/video.mp4";

interface iDialogShop {
  trigger?: ReactNode;
  playEnd: () => void;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}
const DialogPlay = ({ isOpen, playEnd, setIsOpen }: iDialogShop) => {
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
      <DialogContent className="p-0 dw1066 h-auto max-w-[100vw]">
        <DialogTitle></DialogTitle>
        <div className="dw1066 dh660 bgFeeding relative dpt100 dpl30 dpr30 dpb30">
          <DialogTitleView title="Play"></DialogTitleView>
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
