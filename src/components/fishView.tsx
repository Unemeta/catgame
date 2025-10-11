/* eslint-disable @next/next/no-img-element */
// import { saveAs } from "file-saver";

import { cn } from "@/lib/utils";
import DialogImgView from "./dialog/img";
import { useState } from "react";
// import * as globalApi from "@/services/global";
import { useRouter } from "next/router";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";
import mixpanel from "@/utils/mixpanel";

interface iFishView {
  // componentId: number;
  // componentType: number;
  rewardCount: number;
  // status: number
  // expiresAt: string;
  text: string;
}
const FishView = ({ text, rewardCount }: iFishView) => {
  const { userData } = useFetchUser();
  const [showDialog, setshowDialog] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="">{text}</div>
      <div className="mb-[1.3rem] flex justify-center items-center">
        <img
          className="w-[257px] h-[269px] "
          src="/img/chat/fish_reward.min.png"
          alt=""
        />
      </div>
      <div className="flex justify-center items-center mb-[40px]">
        <div className="bg-[#FDA94F] rounded-[20px] px-[50px] py-[25px] text-[50px] ">获取{rewardCount}条小鱼</div>
      </div>
    </div>
  );
};
export default FishView;
