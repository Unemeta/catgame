/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { request } from "@/utils/request";

// 1,2,3是kitty kibble, sashimi, dried fish
// 4,5,6是shiny cat tree, mouse, ball

const itemList = [
  {
    id: 1,
    name: "Kitty Kibble",
    img: "/img/1.jpg",
  },
  {
    id: 2,
    name: "Sashimi",
    img: "/img/2.jpg",
  },
  {
    id: 3,
    name: "Dried Fish",
    img: "/img/3.jpg",
  },
  {
    id: 4,
    name: "Shiny Cat Tree",
    img: "/img/4.jpg",
  },
  {
    id: 5,
    name: "Mouse",
    img: "/img/5.jpg",
  },
  {
    id: 6,
    name: "Ball",
    img: "/img/6.jpg",
  },
];

const getItem = (id: number) => {
  const item = itemList.find((item) => id === item.id);
  return item;
};
interface iDialogBuy {
  trigger?: ReactNode;
  navIndex?: number;
  setNavIndex?: (index: number) => void;
  id: number;
}
const DialogBuy = ({ trigger, id }: iDialogBuy) => {
  const buyConfirm = async () => {
    if (id) {
      try {
        const { data } = await request({
          url: "/cat/v1/shop/goods",
          method: "post",
          data: {
            id,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Dialog>
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
