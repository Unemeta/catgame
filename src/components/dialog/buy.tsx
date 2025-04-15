/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { request } from "@/utils/request";
import { useShowLevelUp, useShowLoveCollect, useFetchUser } from "@/store";
import { getItem } from "@/utils/itemMap";
interface iDialogBuy {
  trigger?: ReactNode;
  navIndex?: number;
  setNavIndex?: (index: number) => void;
  id: number;
  setFoodOpen: (open: boolean) => void;
  setTipsOpen: (open: boolean) => void;
  itemcoin: number;
  itemdiamond: number;
}
const DialogBuy = ({
  trigger,
  id,
  setFoodOpen,
  setTipsOpen,
  itemcoin,
  itemdiamond,
}: iDialogBuy) => {
  const [, setShowLevelUp] = useShowLevelUp();
  const [, setShowLove] = useShowLoveCollect();
  const { userData, fetchUser } = useFetchUser();
  const [isOpen, setIsOpen] = useState(false);

  const buyConfirm = async () => {
    if (id) {
      try {
        const { coin, diamond } = userData;
        if (itemcoin && itemcoin > coin) {
          setTipsOpen(true);
          return false;
        }
        if (itemdiamond && itemdiamond > diamond) {
          setTipsOpen(true);
          return false;
        }
        const { data } = await request({
          url: "/api/cat/v1/shop/goods",
          method: "post",
          data: {
            id,
          },
        });
        setIsOpen(false);
        setFoodOpen(false);
        const { is_level_up } = data;
        // 获取最新状态
        await fetchUser();
        // 始终展示收集爱心
        setShowLove(true);
        if (is_level_up) {
          // 升级 播放升级动画
          setTimeout(() => {
            setShowLevelUp(true);
          }, 3100);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 h-auto flex justify-center">
        <div className="bgBuy dw680 dh660 relative">
          <div className="flex justify-center items-cente dpt40 dmb70">
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
            <span className="dml20 dmr20 text-white dtext35 font-[800] leading-none">
              {getItem(id)?.name}
            </span>
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
          </div>
          <div className="flex justify-center items-center dmb20">
            <img
              className="dw278 dh278 buyShopImg"
              src={getItem(id)?.img}
              alt=""
            />
          </div>
          <div className="dtext26 font-[700] text-[#522192] text-center dmb40">
            Are you sure you want to purchase this item?
          </div>
          <div className="flex justify-center items-center">
            <DialogTrigger>
              <div
                className="bgConfirmBtn cursor-pointer select-none dw266 dh80  flex justify-center items-center"
                onClick={buyConfirm}
              >
                {/* Confirm */}
              </div>
            </DialogTrigger>
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
