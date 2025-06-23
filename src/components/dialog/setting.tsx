/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import { cn } from "@/lib/utils";
import { useFetchUser } from "@/store";

interface iDialogSetting {
  trigger?: ReactNode;
  // isOpen: boolean;
  // setIsOpen: (bool: boolean) => void;
}
const DialogSetting = ({ trigger }: iDialogSetting) => {
  const [isOpen, setisOpen] = useState(false);
  const [indexLanguase, setindexLanguase] = useState(0);
  const { userData } = useFetchUser();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setisOpen(val);
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
              Settings
            </span>
          </div>
          <div className="px-[2rem]">
            <div className="h-[1.6rem]"></div>
            <div className="mb-[1rem] text-white text-[1.4rem] font-[500]">
              Hello, {userData?.nickname}
            </div>
            <div className="flex justify-between items-center px-[1.6rem] py-[0.8rem] bg-white/10 border-white/30 border-[0.1rem] rounded-[1rem]">
              <div className="flex justify-start items-center">
                <img
                  className="w-[1.5rem] h-[1.5rem] mr-[0.6rem]"
                  src="/svg/icon_user.svg"
                  alt=""
                />
                <span className="text-white text-[1.4rem] font-[700]">
                  UID: {userData?.uuid}
                </span>
              </div>
              <div className="">
                <img
                  className="w-[1.8rem] h-[1.8rem]"
                  src="/svg/icon_copy.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-between items-center px-[1.6rem] py-[0.8rem] bg-white/10 border-white/30 border-[0.1rem] rounded-[1rem] my-[0.7rem]">
              <div className="flex justify-start items-center">
                <img
                  className="w-[1.8rem] h-[1.8rem] mr-[0.6rem]"
                  src="/svg/icon_album.svg"
                  alt=""
                />
                <span className="text-white text-[1.4rem] font-[700]">
                  Photo Album
                </span>
              </div>
              <div className="">
                <img
                  className="w-[1.8rem] h-[1.8rem]"
                  src="/svg/icon_arrow_right.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-between items-center px-[1.6rem] py-[0.8rem] bg-white/10 border-white/30 border-[0.1rem] rounded-[1rem]">
              <div className="flex justify-start items-center">
                <img
                  className="w-[1.8rem] h-[1.8rem] mr-[0.6rem]"
                  src="/svg/icon_discord.svg"
                  alt=""
                />
                <span className="text-white text-[1.4rem] font-[700]">
                  Discord
                </span>
              </div>
              <div className="">
                <img
                  className="w-[1.8rem] h-[1.8rem]"
                  src="/svg/icon_arrow_right.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="h-[0.7rem]"></div>
            <div className="flex justify-center items-center gap-[2rem]">
              <div
                className={cn(
                  "bg-white/10 border-white/30 border-[0.2rem] rounded-[10rem] w-[6.4rem] h-[6.4rem] flex justify-center items-center",
                  {
                    "border-white/80": indexLanguase == 0,
                  }
                )}
                onClick={() => {
                  setindexLanguase(0);
                }}
              >
                <span className="text-white text-[1.4rem] font-[700]">
                  日本語
                </span>
              </div>
              <div
                className={cn(
                  "bg-white/10 border-white/30 border-[0.2rem] rounded-[10rem] w-[6.4rem] h-[6.4rem] flex justify-center items-center",
                  {
                    "border-white/80": indexLanguase == 1,
                  }
                )}
                onClick={() => {
                  setindexLanguase(1);
                }}
              >
                <span className="text-white text-[1.4rem] font-[700]">
                  中文
                </span>
              </div>
              <div
                className={cn(
                  "bg-white/10 border-white/30 border-[0.2rem] rounded-[10rem] w-[6.4rem] h-[6.4rem] flex justify-center items-center",
                  {
                    "border-white/80": indexLanguase == 2,
                  }
                )}
                onClick={() => {
                  setindexLanguase(2);
                }}
              >
                <span className="text-white text-[1.4rem] font-[700]">EN</span>
              </div>
            </div>
            <div className="h-[1.6rem]"></div>
            <div className="flex justify-center items-center">
              <div
                className="bg-white shadow-[0px_3px_14px_0px_rgba(255,255,255,0.45)] rounded-[3.1rem] w-[13.2rem] py-[1.2rem] flex justify-center items-center"
                onClick={() => {
                  setisOpen(false);
                }}
              >
                <span className="text-[#E96856] text-[1.6rem] font-[800]">
                  Confirm
                </span>
              </div>
            </div>
            <div className="h-[1.6rem]"></div>
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

export default DialogSetting;
