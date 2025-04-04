/* eslint-disable @next/next/no-img-element */

import DataBackpack from "./dialog/dataBackpack";
import DataShop from "./dialog/dataShop";
import DialogInterWorld from "./dialog/interWorld";

const NavRight = () => {
  return (
    <div className="fixed top-[50%] right-[7.29vw] translate-y-[-50%] ">
      <div className="flex flex-col justify-center items-center">
        <DialogInterWorld
          trigger={
            <div className="flex flex-col justify-center items-center">
              <img
                className="dw116 h-auto dmb10"
                src="/img/nav/rightWorld.min.png"
                alt=""
              />
              <div className="bg-[rgba(41,10,68,0.20)] px-5 py-2 rounded-[130px] text-white dtext22 font-[700] leading-none">
                Inner World
              </div>
            </div>
          }
        ></DialogInterWorld>
        <DataShop></DataShop>
        <DataBackpack></DataBackpack>
      </div>
    </div>
  );
};
export default NavRight;
