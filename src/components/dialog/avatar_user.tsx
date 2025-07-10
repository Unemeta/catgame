/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface iDialogSetting {
  trigger?: ReactNode;
  // isOpen: boolean;
  // setIsOpen: (bool: boolean) => void;
}
const DialogAvatarUser = ({ trigger }: iDialogSetting) => {
  const [isOpen, setisOpen] = useState(false);
  const { userData } = useFetchUser();
  const { t } = useTranslation();
  const router = useRouter();

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
              {t("chat.User Profile")}
            </span>
          </div>
          <div className="px-[2rem]">
            <div className="h-[1.6rem]"></div>
            <div className="flex justify-center items-center">
              <div
                className="flex relative"
                onClick={() => {
                  router.push("/upload");
                }}
              >
                <div className="w-[9.2rem] h-[9.2rem] bg-[url('/img/bg_avatar.png')] bg-cover">
                  <img
                    // src={userData?.avatar ?? "/img/avataUser.min.png"}
                    src={"/img/avataUser.min.png"}
                    alt=""
                  />
                </div>
                <img
                  className="w-[3.4rem] h-[3.4rem] absolute right-0 bottom-0"
                  src="/svg/camera.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="h-[1rem]"></div>
            <div className="flex justify-between items-center bg-[#D3C2B8] border-[1px] border-[#E2CDC1] rounded-[1rem] p-[0.8rem]">
              <div className="flex justify-items-start items-center">
                <img
                  className="w-[1.8rem] h-[1.8rem] mr-[0.6rem]"
                  src="/svg/icon_username.svg"
                  alt=""
                />
                <span className="text-[#6C4734] text-[1.4rem] font-[500]">
                  Nickname
                </span>
              </div>
              <div className="text-[#6C4734] text-[1.4rem] font-[700]">
                {userData?.nickname}
              </div>
            </div>
            <div className="h-[3rem]"></div>
          </div>
        </div>
        <DialogTrigger>
          <div className="absolute top-[-0.4rem] right-[-1.6rem] flex  justify-center items-center cursor-pointer select-none focus-visible:outline-none">
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

export default DialogAvatarUser;
