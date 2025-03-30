import DialogInterWorld from "./dialog/innerWorld";

/* eslint-disable @next/next/no-img-element */
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
        <DialogInterWorld
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
        ></DialogInterWorld>
        <DialogInterWorld
          trigger={
            <div className="flex flex-col justify-center items-center">
              <img
                className="dw116 h-auto dmb10"
                src="/img/nav/rightBackpack.min.png"
                alt=""
              />
              <div className="bg-[rgba(41,10,68,0.20)] px-5 py-2 rounded-[130px] text-white dtext22 font-[700] leading-none">
                Backpack
              </div>
            </div>
          }
        ></DialogInterWorld>
      </div>
    </div>
  );
};
export default NavRight;
