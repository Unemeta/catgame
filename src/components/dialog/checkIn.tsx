/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { useCheckInDia } from "@/store";
interface iDialogRewards {
  trigger?: ReactNode;
  id: number;
}
const DialogCheckIn = ({ id }: iDialogRewards) => {
  const [showCheckIn, setShowCheckIn] = useCheckInDia();
  return (
    <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <div className="w-[30rem] h-[35rem] relative">
          <div className="self-stretch bg-gradient-to-b from-red-300 to-stone-500/0 rounded-[3rem] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] outline outline-2 outline-offset-[-2px] outline-stone-50 inline-flex flex-col justify-start items-center gap-4 overflow-hidden w-full">
            {/* 标题 */}
            <div
              className="text-center justify-start text-yellow-900 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug p-[1rem] rounded-tl-[3rem] rounded-tr-[3rem] w-full"
              style={{
                background: "linear-gradient(180deg, #E3BFA5 0%, #DDB293 100%",
              }}
            >
              Daily Check-in
            </div>

            <div className="self-stretch px-[2rem] flex flex-col justify-start items-center gap-2.5">
              <div className="self-stretch text-white text-[1.2rem] leading-none [text-shadow:_0px_0px_8px_rgb(255_255_255_/_0.45)] text-center">
                Please visit every day to get better rewards.
              </div>
              <div className="self-stretch inline-flex justify-start items-start gap-1.5">
                {/* 左边的猫图 */}
                <img
                  className="w-[9rem] self-stretch rounded-[10px]  outline-1 outline-stone-400/80"
                  src="/img/catexample.png"
                />
                <div className="flex-1 flex justify-around items-start gap-1 flex-wrap">
                  <div className="p-2 relative bg-white/10 rounded-[10px]  outline-1 outline-offset-[-1px] outline-white/30 inline-flex flex-col justify-start items-center gap-px w-[32%]">
                    <div className="relative opacity-50 w-[4rem]">
                      <img className="" src="/img/fishitem.png" />
                    </div>
                    <div className="self-stretch opacity-50 text-center justify-start text-stone-600 text-[1.2rem] font-semibold font-['SF_Pro_Rounded'] leading-3 mt-[0.3rem]">
                      x20
                    </div>
                    <img
                      src="/img/footcheck.png"
                      alt=""
                      className="w-[2.7rem] h-[2.7rem] left-[-0.4rem] top-[-0.4rem] absolute"
                    />
                  </div>
                  <div className="p-2 relative bg-white/30 rounded-[10px] outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-start items-center gap-px w-[32%]">
                    <div className="relative w-[4rem]">
                      <img className="" src="/img/fishitem.png" />
                    </div>
                    <div className="self-stretch opacity-50 text-center justify-start text-stone-600 text-[1.2rem] font-semibold font-['SF_Pro_Rounded'] leading-3 mt-[0.3rem]">
                      x20
                    </div>
                    <div className="px-[0.5rem] py-[0.3rem] left-[-0.4rem] top-[-0.4rem] absolute bg-white rounded-[2rem] outline-1 outline-white inline-flex justify-center items-center gap-2.5">
                      <div className="justify-start text-red-400 text-[1.2rem] font-['SF_Pro_Rounded'] leading-3">
                        Day 4
                      </div>
                    </div>
                  </div>
                  <div className="p-2 relative bg-white/30 rounded-[10px] outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-start items-center gap-px w-[32%]">
                    <div className="relative w-[4rem]">
                      <img className="" src="/img/fishitem.png" />
                    </div>
                    <div className="self-stretch opacity-50 text-center justify-start text-stone-600 text-[1.2rem] font-semibold font-['SF_Pro_Rounded'] leading-3 mt-[0.3rem]">
                      x20
                    </div>
                    <div className="px-[0.5rem] py-[0.3rem] left-[-0.4rem] top-[-0.4rem] absolute bg-white rounded-[2rem] outline-1 outline-white inline-flex justify-center items-center gap-2.5">
                      <div className="justify-start text-red-400 text-[1.2rem] font-['SF_Pro_Rounded'] leading-3">
                        Day 4
                      </div>
                    </div>
                  </div>
                  <div className="p-2 relative bg-white/30 rounded-[10px] outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-start items-center gap-px w-[100%]">
                    <div className="relative w-[4rem]">
                      <img className="" src="/img/fishitem.png" />
                    </div>
                    <div className="self-stretch opacity-50 text-center justify-start text-stone-600 text-[1.2rem] font-semibold font-['SF_Pro_Rounded'] leading-3 mt-[0.3rem]">
                      x20
                    </div>
                    <div className="px-[0.5rem] py-[0.3rem] left-[-0.4rem] top-[-0.4rem] absolute bg-white rounded-[2rem] outline-1 outline-white inline-flex justify-center items-center gap-2.5">
                      <div className="justify-start text-red-400 text-[1.2rem] font-['SF_Pro_Rounded'] leading-3">
                        Day 4
                      </div>
                    </div>
                  </div>
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

export default DialogCheckIn;
