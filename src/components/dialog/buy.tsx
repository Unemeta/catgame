/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from ".";

interface iDialogBuy {
  trigger?: ReactNode;
  navIndex?: number;
  setNavIndex?: (index: number) => void;
}
const DialogBuy = ({ trigger }: iDialogBuy) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 h-auto flex justify-center">
        <div className="bgBuy dw680 dh660 relative">
          <div className="flex justify-center items-cente dpt28 dpb42 dmb80">
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
            <span className="dml20 dmr20 text-white dtext35 font-[800] leading-none">
              Buy Kitty Kibble
            </span>
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
          </div>
          <div className="flex justify-center items-center dmb20">
            <img
              className="dw278 dh278 buyShopImg"
              src="/img/loadBg.png"
              alt=""
            />
          </div>
          <div className="dtext26 font-[700] text-[#522192] text-center dmb40">
            Are you sure you want to purchase this item?
          </div>
          <div className="flex justify-center items-center">
            <div className="flex cursor-pointer select-none dw266 dh80 buyButtonImg flex justify-center items-center">
              Confirm
            </div>
          </div>
          <div className="flex absolute top-0 right-0 translate-x-[100%] translate-y-[-80%]">
            <DialogTrigger>
              <div className="flex justify-center items-center cursor-pointer select-none">
                <img className="dw55 h-auto" src="/img/close.min.png" alt="" />
              </div>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBuy;
