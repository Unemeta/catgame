/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import DialogTitleView from "./dialogTitle";

const videoUrl = "/videos/playball.mp4";

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
    <Dialog open={isOpen} onOpenChange={(val)=>{
      playEnd()
      setIsOpen(val)
    }}>
      <DialogContent className="p-0 dw1066 h-auto max-w-[100vw]">
        <DialogTitle></DialogTitle>
        <div className="dw1066 dh660 bgFeeding relative dpt85 dpl25 dpr25 dpb20">
          <DialogTitleView title="Play"></DialogTitleView>
          <video
            ref={refVideo}
            autoPlay
            muted
            playsInline
            src={videoUrl}
            preload="auto"
            className="w-full h-full object-cover rounded-[10px]"
          ></video>
            <DialogTrigger>
            <div className="absolute dtop45 drightF10 flex justify-center items-center cursor-pointer select-none">
              <img className="dw48 h-auto" src="/img/close.min.png" alt="" />
            </div>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPlay;
