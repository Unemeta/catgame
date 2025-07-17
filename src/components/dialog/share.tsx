/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import { toast } from "react-toastify";
import IconView from "../IconView";
import { shareUtil } from "@/lib/utils";
import * as globalApi from "@/services/global";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

const DialogShare = ({
  trigger,
  targetRef,
  fileName = "screenshot",
  callback,
}: any) => {
  const [isOpen, setisOpen] = useState(false);
  const [link] = useState("https://discord.gg/HBm6qxn4dM");
  const [format] = useState("png");
  const { t } = useTranslation();

  const downloadScreenshot = async () => {
    if (!targetRef.current) {
      console.error("未找到目标元素");
      return;
    }
    try {
      callback(false);
      await new Promise((resolve) => setTimeout(resolve, 500)); // 保留小延迟（可选）
      setTimeout(async () => {
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
        callback(true);
      }, 200);
    } catch (err) {
      console.error("截图失败:", err);
    }
  };
  const copyToClipboard = (textToCopy: string | number) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy.toString());
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy.toString();
      textArea.style.position = "absolute";
      textArea.style.opacity = "0";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise<void>((res, rej) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  };
  const handleDownload = async () => {
    // console.log("handleDownload");
    downloadScreenshot();
  };
  const handleDiscord = async () => {
    globalApi.eventRecord("click_discord_link");
    window.open("https://discord.gg/HBm6qxn4dM", "_blank");
  };
  const text = {
    zh: "喵喵和我的快乐旅程～～～",
    en: "My joyful journey with Meow Meow~",
    ja: "ニャンコとの楽しい旅～～～",
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setisOpen(val);
        if (val) {
          globalApi.eventRecord("share_popup_show");
        }
      }}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 h-auto w-[83vw]">
        <DialogTitle></DialogTitle>
        <div
          className="rounded-[3rem] bg-[linear-gradient(187deg,#B48471_-9.74%,rgba(212,204,195,0.60)_72.93%)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem] "
          // style={{
          //   background:
          //     "linear-gradient(187deg, #EDA88D -9.74%, rgba(157, 137, 87, 0.00) 72.93%, rgba(240, 233, 225, 0.60));",
          // }}
        >
          <div className="flex justify-center items-center bg-[linear-gradient(180deg,#E3BFA5_0%,#DDB293_100%)] rounded-tl-[3rem] rounded-tr-[3rem] py-[1rem]">
            <span className="bg-gradient-to-t from-[#6C4734] to-[#6C4B3A] bg-clip-text text-transparent text-[1.8rem] font-[800]">
              {t("letter.share")}
            </span>
          </div>
          <div className="px-[2rem]">
            <div className="h-[1.6rem]"></div>
            <div className="p-[1rem] bg-white/30 rounded-[1.5rem] border-white/20 border-[1px]">
              <div className="text-[1.4rem] font-[500] text-white leading-[1.3] text-nowrap">
                {t("letter.shareText")}
              </div>
              <div className="text-[1.4rem] font-[500] text-[#2F52FF] leading-[1.3] mb-[1rem]">
                {link}
              </div>
              <div
                className="flex justify-center items-center bg-[#FFF] shadow-[0px_3px_14px_0px_rgba(255,255,255,0.45);] rounded-[3.1rem] h-[3.8rem]"
                onClick={() => {
                  // window.open("https://x.com/", "_blank");
                  const lan = localStorage.getItem("locale") || "en";
                  window.open(
                    shareUtil.getTwitterShareUrl({
                      url: window.location.href,
                      text: `${text[lan as keyof typeof text]}`,
                    }),
                    "_blank"
                  );
                }}
              >
                <IconView
                  className="w-[2rem] h-[2rem] mr-[1rem]"
                  type="x"
                ></IconView>
                <span className="text-[#E96856] text-[1.6rem] font-[800]">
                  {t("letter.shareText")}
                </span>
              </div>
            </div>
            <div className="h-[2rem]"></div>
            <div className="flex justify-center items-center gap-[4.1rem]">
              <div className="">
                <img
                  className="w-[3.6rem] h-[3.6rem]"
                  src="/img/copy_share.png"
                  alt=""
                  onClick={() => {
                    if (link) {
                      copyToClipboard(link).then(() => {
                        toast.success("Copied");
                      });
                    } else {
                      toast.error("link null");
                    }
                  }}
                />
                <div className="h-[0.6rem]"></div>
                <span className="text-white text-[1.4rem] font-[500]">
                  {t("letter.copy")}
                </span>
              </div>
              <div
                className="flex flex-col justify-center items-center"
                onClick={handleDownload}
              >
                <img
                  className="w-[3.6rem] h-[3.6rem]"
                  src="/img/letter_downld.png"
                  alt=""
                />
                <div className="h-[0.6rem]"></div>
                <span className="text-white text-[1.4rem] font-[500]">
                  {t("letter.download")}
                </span>
              </div>
              <div
                className="flex flex-col justify-center items-center"
                onClick={handleDiscord}
              >
                <img
                  className="w-[3.6rem] h-[3.6rem]"
                  src="/img/discord.png"
                  alt=""
                />
                <div className="h-[0.6rem]"></div>
                <span className="text-white text-[1.4rem] font-[500]">
                  Discord
                </span>
              </div>
            </div>
            <div className="h-[3rem]"></div>
          </div>
        </div>
        <DialogTrigger>
          <div className="absolute top-[-0.4rem] right-[-1.6rem] flex  justify-center items-center cursor-pointer select-none">
            <img
              className="w-[4.4rem] h-[4.4rem]"
              src="/img/close2.min.png"
              alt=""
            />
          </div>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default DialogShare;
