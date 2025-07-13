/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from ".";
import { cn } from "@/lib/utils";
import { downloadMedia } from "@/utils/save";
import * as globalApi from "@/services/global";

interface iDialogImgView {
  show: boolean;
  setShow: (val: boolean) => void;
  cb?: () => void;
  trigger?: ReactNode;
  type?: string;
  src: string;
  eventid?: number;
}
const DialogImgView = ({
  show,
  setShow,
  trigger,
  type,
  src,
  eventid,
}: iDialogImgView) => {
  const handleDownload = () => {
    console.log("图片", src);
    // saveAs(src, "downloaded-image.jpg");
    downloadMedia(src, "downloaded-image.jpg");
    if (type === "fixed_event") {
      globalApi.eventRecord("fixed_save_img", src);
    }
    if (type === "ai_event") {
      globalApi.eventRecord("ai_save_img", src);
    }
    if (type === "farewell_letter") {
      globalApi.eventRecord("farewell_save_img", src);
    }
    console.log("图片已下载");
  };
  const handleZoomCb = () => {
    console.log("图片放大", eventid);

    if (type === "fixed_event") {
      globalApi.eventRecord("fiexed_zoom_in", src);
    }
    if (type === "ai_event") {
      globalApi.eventRecord("ai_zoom_in", src);
    }
    if (type === "farewell_letter") {
      globalApi.eventRecord("farewell_zoom_in", src);
    }
  };
  return (
    <Dialog
      open={show}
      onOpenChange={(val) => {
        console.log(val);
        setShow(val);
      }}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogOverlay className="bg-black">
        {/* w-[83vw] */}
        <DialogContent className="p-0 w-full  h-full max-w-[90vw]">
          <div className="flex justify-between items-center absolute left-0 right-0 top-0 z-[100] mt-[2rem]">
            <img
              className="imgClose w-[3.8rem] h-[3.8rem]"
              onClick={() => setShow(false)}
              src="/img/close_img.png"
              alt=""
            />

            <img
              className="imgDownload w-[3.8rem] h-[3.8rem]"
              onClick={handleDownload}
              src="/img/download_img.png"
              alt=""
            />
          </div>
          <DialogTitle></DialogTitle>
          <div className="px-[2rem] ">
            <div
              className={cn(
                "bg-[rgba(232,221,219,1)] rounded-[1rem] px-[1.8rem] pt-[2.6rem] pb-[5.3rem] w-[30rem]",
                {
                  "bg-[url('/img/bg/bg_letter_dialog.png')] bg-100100":
                    type === "farewell_letter",
                }
              )}
            >
              <img
                className="chatMedia w-full h-[35rem] max-h-[50vh]"
                src={src}
                style={{ objectFit: "contain" }}
                alt=""
              />
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogImgView;
