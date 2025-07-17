/* eslint-disable @next/next/no-img-element */
// import { saveAs } from "file-saver";

import { cn } from "@/lib/utils";
import DialogImgView from "./dialog/img";
import { useState } from "react";
import * as globalApi from "@/services/global";
import { useRouter } from "next/router";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";

interface iPhotoView {
  src: string;
  eventid: number;
  type: string;
}
const ImgView = ({ src, eventid, type }: iPhotoView) => {
  const { userData } = useFetchUser();
  const [showDialog, setshowDialog] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

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
    <DialogImgView
      show={showDialog}
      cb={() => {}}
      setShow={setshowDialog}
      src={src}
      type={type}
      trigger={
        <div className="">
          <div
            className=""
            onClick={() => {
              handleZoomCb();
              if (type === "farewell_letter") {
                router.push(`/letter?id=${userData?.uuid}`);
              } else {
                setshowDialog(true);
              }
            }}
          >
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
                <div className="mt-[0.6rem]">{t("letter.LetterDesc")}</div>
                <img
                  className="w-full h-[1px] my-[0.6rem]"
                  src="/img/letter_line.png"
                  alt=""
                />
                <div className="flex justify-center items-center">
                  <span className="text-[#E96856] text-[1.2rem] font-[500]">
                    {t("chat.View Now")}
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
