/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { useCheckInDia } from "@/store";
interface iDialogExchange {
  trigger?: ReactNode;
  id: number;
}
const DialogExchange = ({ id }: iDialogExchange) => {
  console.log(id);
  const [showCheckIn, setShowCheckIn] = useCheckInDia();
  return (
    <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
      <DialogContent className="p-0 h-auto w-[83vw]">
        <DialogTitle></DialogTitle>
        <div className="relative bg-[linear-gradient(187deg,#B48471_-9.74%,rgba(212,204,195,0.60)_72.93%)] rounded-[3rem]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem]">
          <div className="self-stretch  to-stone-500/0 rounded-[3rem] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] outline outline-2 outline-offset-[-2px] outline-stone-50 inline-flex flex-col justify-start items-center gap-4 overflow-hidden w-full">
            {/* 标题 */}
            <div
              className="text-center justify-start text-yellow-900 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug p-[1rem] rounded-tl-[3rem] rounded-tr-[3rem] w-full"
              style={{
                background: "linear-gradient(180deg, #E3BFA5 0%, #DDB293 100%",
              }}
            >
              Exchange
            </div>

            <div className="self-stretch px-[2rem] flex flex-col justify-start items-center gap-[1rem]">
              <div className="self-stretch text-white text-[1.4rem] leading-none [text-shadow:_0px_0px_8px_rgb(255_255_255_/_0.45)] text-left">
                You have insufficient chats for today. Would you like to spend
                Fish to buy more chat opportunities?
              </div>

              {/* content */}
              <div className="self-stretch p-[0.8rem] bg-white/30 rounded-2xl outline-offset-[-1px] inline-flex flex-col justify-start items-center gap-2.5">
                <div className="w-[8.5rem] relative">
                  <img className="" src="/img/fishitem.png" />
                </div>
                <div className="self-stretch text-center justify-start text-stone-600 text-[1.6rem] font-['SF_Pro_Rounded'] leading-none">
                  400
                </div>
                <div className="self-stretch p-[0.8rem] bg-white/50 rounded-[1rem] outline-1 outline-offset-[-1px] outline-white inline-flex justify-between items-center">
                  <img
                    src="/img/defish.png"
                    alt=""
                    className="w-[2.4rem] h-[2.4rem]"
                  />
                  <div className="text-center justify-start text-red-400 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug">
                    4
                  </div>
                  <img
                    src="/img/addfish.png"
                    alt=""
                    className="w-[2.4rem] h-[2.4rem]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <DialogTrigger>
                <div className="self-stretch pb-4 flex flex-col justify-start items-center gap-2.5">
                  <div className="w-[13.2rem] h-[3.8rem] px-5 py-3 bg-white rounded-[31.74px] shadow-[0px_4px_24px_0px_rgba(214,90,63,0.60)] shadow-[0px_3px_14px_0px_rgba(255,255,255,0.45)] inline-flex justify-center items-center gap-2">
                    <div className="text-center justify-start text-red-400 text-[1.6rem] font-extrabold font-['SF_Pro_Rounded'] leading-tight">
                      Confirm
                    </div>
                  </div>
                </div>
              </DialogTrigger>
            </div>
          </div>

          <div className="flex absolute top-[2rem] right-[2.5rem] translate-x-[100%] translate-y-[-80%]">
            <DialogTrigger>
              <div className="flex justify-center items-center cursor-pointer select-none">
                <img className="w-[4rem] h-auto" src="/img/close.png" alt="" />
              </div>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogExchange;
