/* eslint-disable @next/next/no-img-element */
import { Tabs } from "@/types";
import { useEffect, useState } from "react";
import { request } from "@/utils/request";
import DialogFood from "./food";

const DataShop = () => {
  const [foodTabs, setFoodTabs] = useState<Tabs>({
    food: { unlocked: false, goods: [] },
  });

  const shopInfo = async () => {
    const { data } = await request({
      url: "/api/cat/v1/shop/shop/info",
      method: "get",
    });
    
    console.log(data);
    setFoodTabs(data);
  };
  useEffect(() => {
    (async () => {
      try {
        shopInfo();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <DialogFood
      title="Shop"
      tabs={foodTabs}
      trigger={
        <div className="flex flex-col justify-center items-center my-10">
          <img
            className="dw116 h-auto dmb10"
            src="/img/nav/rightShop.min.png"
            alt=""
          />
          <div className="bg-[rgba(41,10,68,0.20)] px-5 py-2 rounded-[130px] text-white dtext22 font-[700] leading-none">
            Shop
          </div>
        </div>
      }
    ></DialogFood>
  );
};
export default DataShop;
