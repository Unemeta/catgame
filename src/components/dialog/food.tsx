/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { cn } from "@/lib/utils";
import DialogBuy from "./buy";
import { getItem } from "@/utils/itemMap";
import { formatSecondsToTime } from "@/utils/formatTime";
interface Tabs {
  [key: string]: TabItem; // 声明索引签名
}
interface iDialogShop {
  trigger?: ReactNode;
  navIndex?: number;
  setNavIndex?: (index: number) => void;
  title: string;
  tabs: Tabs;
}
interface good {
  affection: number;
  coin: number;
  diamond: number;
  expire: number;
  id: number;
  unlocked: boolean;
}
interface TabItem {
  unlocked: boolean;
  goods: Array<good>;
  // 其他可能的属性...
}

const DialogFood = ({ trigger, title, tabs }: iDialogShop) => {
  const [goodsIndex, setgoodsIndex] = useState(0);
  const [navIndex, setNavIndex] = useState(0);
  const [chosenItem, setChosen] = useState({
    affection: 0,
    coin: 0,
    diamond: 0,
    expire: 0,
    id: 0,
    unlocked: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (tabs[Object.keys(tabs)[navIndex]].goods?.length > 0) {
      const item = tabs[Object.keys(tabs)[navIndex]].goods[0];
      setgoodsIndex(0);
      setChosen(item);
    } else {
      setChosen({
        affection: 0,
        coin: 0,
        diamond: 0,
        expire: 0,
        id: 0,
        unlocked: false,
      });
    }
  }, [tabs, navIndex]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 dw1066 h-auto overflow-hidden max-w-[1000px]">
        <DialogTitle></DialogTitle>
        <div className="dw1066 dh690 bgFeeding relative dpt100 dpl30 dpr30 dpb30">
          <div className="absolute top-0 right-0 w-full  dpt10">
            <div className="flex justify-center items-cente">
              <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
              <span className="dml20 dmr20 text-white dtext40 font-[800] leading-none">
                {title}
              </span>
              <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
            </div>
          </div>
          <div className="flex w-full h-full ">
            <div className="leftNav w-[6vw] flex flex-col gap-2 text-[1vw] font-[800] mr-[-1px]">
              {tabs &&
                Object.keys(tabs).map((tab, index) => (
                  <div
                    className={cn(
                      "bgShopNavUnselected flex-1 flex justify-center items-center text-[#FFFDCE] font-[800] rounded-tl-[8px] rounded-bl-[8px] flex-col",
                      {
                        bgShopNavselected: navIndex === index,
                      }
                    )}
                    onClick={() => {
                      if (tabs[tab].unlocked === false) {
                        return;
                      }
                      setNavIndex?.(index);
                    }}
                    key={tab}
                  >
                    {/* 是否显示锁 */}
                    {tabs[tab].unlocked === false ? (
                      <img
                        className="w-[24px] h-auto"
                        src="/img/svg/lock.svg"
                        alt=""
                      />
                    ) : (
                      <></>
                    )}

                    <div>{tab}</div>
                  </div>
                ))}
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
                  {/* <img
                    className="gridArea1111 dw455 dh455"
                    src={`/img/${
                      tabs?.[Object.keys(tabs)[navIndex]]?.goods?.[goodsIndex]
                        ?.id
                    }.jpg`}
                    alt=""
                  /> */}
                  <img
                    className="gridArea1111 dw455 dh455"
                    src={`${
                      getItem(
                        tabs?.[Object.keys(tabs)[navIndex]]?.goods?.[goodsIndex]
                          ?.id
                      )?.img
                    }`}
                    alt=""
                  />
                  <div className="gridArea1111 relative">
                    <div className="dpl20 dpr20 dpt12 dpb12 bg-black/30">
                      <div className="flex justify-between items-center ">
                        <div className="flex justify-start items-center">
                          <span className="text-[#FFFDCE] dtext26 font-[700]">
                            {getItem(chosenItem.id)?.name}
                          </span>
                          <div className="line w-[2px] dh24 bg-white/30 dml10 dmr10"></div>
                          <img
                            className="dw24 h-auto dmr10"
                            src="/img/svg/timer.svg"
                            alt=""
                          />
                          <span className="dtext24 text-white font-[500]">
                            {/* 02h:00 */}
                            {formatSecondsToTime(chosenItem.expire)}
                            {/* {chosenItem.expire} */}
                          </span>
                        </div>
                        <div className="flex justify-end items-center">
                          <img
                            className="dw28 h-auto dmr10 relative mt-[2px]"
                            src="/img/love.svg"
                            alt=""
                          />
                          <span className="text-white dtext20">
                            +{chosenItem.affection}
                          </span>
                        </div>
                      </div>
                      <div className="dtext18 font-[600] text-white">
                        {getItem(chosenItem.id)?.des}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full flex justify-between items-center dpl15">
                      <div className="flex justify-center items-center bg-black/40 rounded-[4vw] dpl15 dpr15 dmb15">
                        {chosenItem.diamond ? (
                          <>
                            <img
                              className="dw28 dh35 mr-2"
                              src="/img/LostEnergy.svg"
                              alt=""
                            />
                            <span className="text-[#FFFDCE] dtext30 font-[700]">
                              {chosenItem.diamond.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              className="dw35 dh35 mr-2"
                              src="/img/gold.svg"
                              alt=""
                            />
                            <span className="text-[#FFFDCE] dtext30 font-[700]">
                              {chosenItem.coin.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                      {chosenItem?.id > 0 && (
                        <DialogBuy
                          trigger={
                            <div
                              className="dw180 dh80 flex justify-center items-center cursor-pointer select-none"
                              style={{
                                background:
                                  "linear-gradient(254deg, #FFFDCB 0%, #FFF600 144.38%)",
                                boxShadow:
                                  "-3.556px 3.556px 12.444px 0px rgba(0, 0, 0, 0.10)",
                                borderRadius: "1vw 0px 1.4vw 0px",
                                color: "#8F1D00",
                                fontFamily: "SF Pro Rounded",
                                fontSize: "13px",
                              }}
                            >
                              BUY
                            </div>
                          }
                          id={chosenItem.id}
                          setFoodOpen={setIsOpen}
                        ></DialogBuy>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="foodList flex-2 overflow-y-scroll dpr30">
                {/* {tabs[Object.keys(tabs)[navIndex]].goods} */}
                {tabs[Object.keys(tabs)[navIndex]].goods?.map((item, index) => (
                  <div
                    className="dpl34 dpr10 relative dmb10 dh200"
                    key={index}
                    onClick={() => {
                      setgoodsIndex(index);
                      setChosen(item);
                    }}
                  >
                    {index === goodsIndex && (
                      <div className="bg-[url(/img/svg/foodListItemSelect.svg)] bg-cover absolute right-0 top-0 dw224 dh200"></div>
                    )}
                    <div
                      className={cn(
                        "absolute top-[0.5vw] right-[0.5vw] dw180 dh180 rounded-[10px]"
                      )}
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${getItem(item.id)?.img})`,
                      }}
                    >
                      <div className="text-[#FFFDCE] bg-black/30 rounded-[20px] inline-flex justify-center items-center absolute left-[50%] bottom-0 translate-x-[-50%] w-[90%]">
                        {/* <img
                          src="/img/gold.svg"
                          alt=""
                          className="w-[18px]"
                        />
                        {item.coin.toLocaleString()} */}

                        {item.diamond ? (
                          <>
                            <img
                              className="dw28 dh35 mr-1"
                              src="/img/LostEnergy.svg"
                              alt=""
                            />
                            <span className="text-[#FFFDCE] dtext30 font-[700]">
                              {item.diamond.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              className="dw35 dh35 mr-1"
                              src="/img/gold.svg"
                              alt=""
                            />
                            <span className="text-[#FFFDCE] dtext30 font-[700]">
                              {item.coin.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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

export default DialogFood;
