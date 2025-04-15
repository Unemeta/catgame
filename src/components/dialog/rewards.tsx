/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { useRewardsDia } from "@/store";
import { getItem } from "@/utils/itemMap";
interface iDialogRewards {
  trigger?: ReactNode;
  id: number;
}
const DialogRewards = ({ id }: iDialogRewards) => {
  const [showRewards, setShowRewards] = useRewardsDia();
  return (
    <Dialog open={showRewards} onOpenChange={setShowRewards}>
      <DialogTitle></DialogTitle>
      <DialogContent className="p-0 h-auto flex justify-center">
        <div className="bgBuy dw680 dh660 relative">
          <div className="flex justify-center items-cente dpt40 dmb70">
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
            <span className="dml20 dmr20 text-white dtext35 font-[800] leading-none">
              {"Rewards"}
            </span>
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
          </div>
          <div className="flex justify-center items-center dmb20">
            <img
              className="dw278 dh278 rewardImg"
              src={getItem(id)?.img}
              alt=""
            />
          </div>
          <div className="dtext26 font-[700] text-[#522192] text-center dmb40">
            <div className="flex items-center justify-center">
              <div> Rewards for playing {getItem(id)?.name} :</div>
              <img src="/img/gold.svg" alt="" className="rewardGold" />
              <div className="dml10">x  {getItem(id)?.reward}</div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <DialogTrigger>
              <div
                className="bgConfirmBtn cursor-pointer select-none dw266 dh80  flex justify-center items-center"
                onClick={() => {}}
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

export default DialogRewards;
