/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";

const videoUrl = "/videos/video.mp4";

interface iDialogShop {
  trigger?: ReactNode;
}
const DialogInterWorld = ({ trigger }: iDialogShop) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 dw1066 h-auto  max-w-[1000px]">
        <DialogTitle></DialogTitle>
        <div className="dw1066 dh660 bgFeeding relative dpt100 dpl30 dpr30 dpb30">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoUrl}
            preload="auto"
            className="w-full h-full object-none"
          >
            {/* <source src={videoUrl} type="video/mp4"/> */}
          </video>
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

export default DialogInterWorld;
