/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from ".";
import IconView from "../IconView";
import { cn } from "@/lib/utils";
import { request } from "@/utils/request";
import { toast } from "react-toastify";
interface iDialogExchange {
  show: boolean;
  setShow: (val: boolean) => void;
  cb: () => void;
  trigger?: ReactNode;
  id: number;
}
const DialogExchange = ({ id, show, setShow, cb }: iDialogExchange) => {
  const [amountBuy, setamountBuy] = useState(1);
  console.log(id);

  const handleConfirm = async () => {
    try {
      const res = await request({
        url: `/api/cat/v1/chat/fish/swap`,
        method: "post",
        data: {
          type: 0,
          amount: amountBuy,
        },
      });
      console.log(res);
      toast.success("Exchange successful");
      cb();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data || JSON.stringify(error));
    }
    setShow(false);
  };
  return (
    <Dialog
      open={show}
      onOpenChange={(val) => {
        console.log(val);
        setShow(val);
      }}
    >
      <DialogContent className="p-0 h-auto w-[83vw]">
        <div className="relative bg-[linear-gradient(187deg,#B48471_-9.74%,rgba(212,204,195,0.60)_72.93%)] rounded-[3rem]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem]">
          <div className=" inline-flex flex-col justify-start items-center overflow-hidden w-full">
            <div
              className="text-center justify-start text-yellow-900 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug p-[1rem] rounded-tl-[3rem] rounded-tr-[3rem] w-full"
              style={{
                background: "linear-gradient(180deg, #E3BFA5 0%, #DDB293 100%",
              }}
            >
              Exchange
            </div>

            <div className="self-stretch px-[2rem] flex flex-col justify-start items-center">
              <div className="mt-[1.6rem] mb-[1rem] self-stretch text-white text-[1.4rem] leading-none [text-shadow:_0px_0px_8px_rgb(255_255_255_/_0.45)] text-left">
                Would you like to exchange Fish for Chat Points?
              </div>

              {/* content */}
              <div className="self-stretch bg-white/30 rounded-2xl outline-offset-[-1px] inline-flex flex-col justify-start items-center gap-2.5">
                <div className="w-[8.5rem] relative">
                  <img className="" src="/img/fishitem.png" />
                </div>
                <div className="mt-[1rem] mb-[1rem] self-stretch text-center justify-start text-stone-600 text-[1.6rem] font-['SF_Pro_Rounded'] leading-none">
                  {amountBuy}
                </div>
                <div className="self-stretch p-[0.8rem] bg-white/50 rounded-[1rem] outline-1 outline-offset-[-1px] outline-white inline-flex justify-between items-center">
                  <IconView
                    className={cn("w-[2.4rem] h-[2.4rem] text-[#A99996]", {
                      "text-[#E96856]": amountBuy > 1,
                    })}
                    type="sub"
                    onClick={() => {
                      if (amountBuy > 1) {
                        setamountBuy((pre) => pre - 1);
                      }
                    }}
                  ></IconView>
                  <div className="text-center justify-start text-red-400 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug">
                    {amountBuy}
                  </div>
                  <IconView
                    className={cn("w-[2.4rem] h-[2.4rem] text-[#E96856]", {
                      // "text-[#E96856]": amountBuy > 1
                    })}
                    type="add"
                    onClick={() => {
                      setamountBuy((pre) => pre + 1);
                    }}
                  ></IconView>
                </div>
                <div className="h-[0.5rem]"></div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-[1.6rem] mb-[1.6rem]">
              <div
                className="self-stretch flex flex-col justify-start items-center gap-2.5"
                onClick={handleConfirm}
              >
                <div className="w-[13.2rem] h-[3.8rem] px-5 py-3 bg-white rounded-[31.74px] shadow-[0px_3px_14px_0px_rgba(255,255,255,0.45)] inline-flex justify-center items-center gap-2">
                  <div className="text-center justify-start text-red-400 text-[1.6rem] font-extrabold font-['SF_Pro_Rounded'] leading-tight">
                    Confirm
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex absolute top-[1.5rem] right-[2.5rem] translate-x-[100%] translate-y-[-80%]">
            <div
              className="flex justify-center items-center cursor-pointer select-none"
              onClick={() => setShow(false)}
            >
              <img className="w-[4rem] h-auto" src="/img/close.png" alt="" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogExchange;
