/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from ".";
import { cn } from "@/lib/utils";
import DialogBuy from "./buy";

interface iDialogShop {
  trigger?: ReactNode;
  navIndex?: number;
  setNavIndex?: (index: number) => void;
}
const DialogShop = ({ trigger, navIndex, setNavIndex }: iDialogShop) => {
  const [goodsIndex, setgoodsIndex] = useState(0);
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 dw1066 h-auto overflow-hidden max-w-[1000px]">
        <div className="dw1066 dh660 bgFeeding relative dpt100 dpl30 dpr30 dpb30">
          <div className="absolute top-0 right-0 w-full  dpt10">
            <div className="flex justify-center items-cente">
              <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
              <span className="dml20 dmr20 text-white dtext40 font-[800] leading-none">
                Shop
              </span>
              <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
            </div>
          </div>
          <div className="flex w-full h-full ">
            <div className="leftNav w-[6vw] flex flex-col gap-2 text-[1vw] font-[800]">
              <div
                className={cn(
                  "bgShopNavUnselected flex-1 flex justify-center items-center text-[#FFFDCE] font-[800] rounded-tl-[8px] rounded-bl-[8px]",
                  {
                    bgShopNavselected: navIndex === 0,
                  }
                )}
                onClick={() => {
                  setNavIndex?.(0);
                }}
              >
                Toys
              </div>
              <div
                className={cn(
                  "bgShopNavUnselected flex-1 flex justify-center items-center text-[#FFFDCECC] font-[500] rounded-tl-[8px] rounded-bl-[8px] cursor-pointer select-none",
                  {
                    bgShopNavselected: navIndex === 1,
                  }
                )}
                onClick={() => {
                  setNavIndex?.(1);
                }}
              >
                Furniture
              </div>
              <div
                className={cn(
                  "bgShopNavUnselected flex flex-col justify-center items-center bg-[#3f24a1] flex-1 text-[#FFFDCECC] font-[500] rounded-tl-[8px] rounded-bl-[8px] mb-2 cursor-not-allowed",
                  {
                    bgShopNavselected: navIndex === 2,
                  }
                )}
                onClick={() => {
                  // setNavIndex?.(2);
                }}
              >
                <img
                  className="w-[24px] h-auto"
                  src="/img/svg/lock.svg"
                  alt=""
                />
                <span>Special</span>
              </div>
            </div>
            <div
              className={cn(
                "shopItem bgShopCtt  flex-1 flex dpt50 dpb50 rounded-tr-[5px] rounded-br-[8px] rounded-bl-[8px]",
                {}
              )}
            >
              <div className="w-[5vw]"></div>
              <div className="curFoodItem dw455">
                <div className="grid border-[0.3vw] border-[#FF0] rounded-[1.7vw] overflow-hidden shadow-[0px_20px_30px_0px_rgba(132_72_131_0.46)]">
                  <img
                    className="gridArea1111 dw455 dh455"
                    src="/img/loadBg.png"
                    alt=""
                  />
                  <div className="gridArea1111 relative">
                    <div className="dpl20 dpr20 dpt12 dpb12 bg-black/30">
                      <div className="flex justify-between items-center ">
                        <div className="flex justify-start items-center">
                          <span className="text-[#FFFDCE] dtext26 font-[700]">
                            Kitty Kibble
                          </span>
                          <div className="line w-[2px] dh24 bg-white/30 dml10 dmr10"></div>
                          <img
                            className="dw24 h-auto dmr10"
                            src="/img/svg/timer.svg"
                            alt=""
                          />
                          <span className="dtext24 text-white font-[500]">
                            02h:00
                          </span>
                        </div>
                        <div className="flex justify-end items-center">
                          <img
                            className="dw28 h-auto dmr10 relative mt-[2px]"
                            src="/img/love.svg"
                            alt=""
                          />
                          <span className="text-white dtext20">+1</span>
                        </div>
                      </div>
                      <div className="dtext18 font-[600] text-white">
                        Crunchy bites for happy!
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full flex justify-between items-center dpl15">
                      <div className="flex justify-center items-center bg-black/40 rounded-[4vw] dpl15 dpr15 dmb15">
                        <img
                          className="dw24 dh35 mr-2"
                          src="/img/LostEnergy.svg"
                          alt=""
                        />
                        <span className="text-[#FFFDCE] dtext30 font-[700]">
                          468
                        </span>
                      </div>
                      <div
                        className="dw180 dh80 flex justify-center items-center cursor-pointer select-none"
                        style={{
                          background:
                            "linear-gradient(254deg, #FFFDCB 0%, #FFF600 144.38%)",
                          boxShadow:
                            "-3.556px 3.556px 12.444px 0px rgba(0, 0, 0, 0.10)",
                          borderRadius: "1vw 0px 1.4vw 0px",
                        }}
                      >
                        <DialogBuy trigger={<span className="cursor-pointer select-none">BUY</span>}></DialogBuy>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="foodList flex-2 overflow-y-scroll dpr30">
                {[1, 1, 1]?.map((item, index) => (
                  <div
                    className="dpl34 dpr10 relative dmb10 dh200"
                    key={index}
                    onClick={() => {
                      setgoodsIndex(index);
                    }}
                  >
                    {index === goodsIndex && (
                      <div className="bg-[url(/img/svg/foodListItemSelect.svg)] bg-cover absolute right-0 top-0 dw224 dh200"></div>
                    )}
                    <div className="bg-[url(/img/avatarTest.png)] bg-cover absolute top-[0.5vw] right-[0.5vw] dw180 dh180 rounded-[10px]"></div>
                  </div>
                ))}
              </div>
              <div className="dw30"></div>
            </div>
          </div>
        </div>
        <DialogTrigger>
          <div className="flex justify-center items-center cursor-pointer select-none">
            <img className="dw48 h-auto" src="/img/close.min.png" alt="" />
          </div>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default DialogShop;
