/* eslint-disable @next/next/no-img-element */
// import { saveAs } from "file-saver";

import { cn } from "@/lib/utils";
import DialogImgView from "./dialog/img";
import { useState } from "react";
interface iPhotoView {
  src: string;
  eventid: number;
  type: string;
}
const ImgView = ({ src, eventid, type }: iPhotoView) => {
  const [showDialog, setshowDialog] = useState(false);

  

  return (
    <DialogImgView
      show={showDialog}
      cb={() => {}}
      setShow={setshowDialog}
      src={src}
      eventid={eventid}
      trigger={
        <div className="">
          {/* <div className="flex justify-between items-center w-[100vw] toolbarRender relative hidden">
            <svg
              className="imgClose"
              onClick={() => setshowDialog(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg
              className="imgDownload"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={handleDownload}
            >
              <path
                d="M3 21L21 21M6 11L12 17M12 17L18 11M12 17L12 3"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}
          <div className="" onClick={() => setshowDialog(!showDialog)}>
            <div
              className={cn(
                "bg-[rgba(232,221,219,1)] rounded-[1rem] px-[1rem] pt-[1.4rem] pb-[2.8rem]",
                {
                  "bg-[url('/img/bg/bg_letter_dialog.png')] bg-100100":
                    type === "farewell_letter",
                }
              )}
            >
              <img
                className="chatMedia"
                src={src}
                style={{ objectFit: "contain" }}
                alt=""
              />
            </div>
            {type === "farewell_letter" && (
              <div className="">
                <div className="mt-[0.6rem]">
                  $
                  {
                    "A heartwarming confession letter just for you is waiting! Click me to see Meow Meow's little thoughts 🐾"
                  }
                </div>
                <img
                  className="w-full h-[1px] my-[0.6rem]"
                  src="/img/letter_line.png"
                  alt=""
                />
                <div className="flex justify-center items-center">
                  <span className="text-[#E96856] text-[1.2rem] font-[500]">
                    ${"NOW GO >"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    ></DialogImgView>
  );
};
export default ImgView;
