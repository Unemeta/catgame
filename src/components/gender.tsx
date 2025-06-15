/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { useState } from "react";
const Age = ({ onClick }: iAnswerView) => {
  const [old, setOld] = useState(0);
  return (
    <div className="flex flex-col justify-center items-center mt-[18rem]">
      <div className="text-center justify-start text-[#EA8373] text-[3rem] font-bold font-['SF_Pro_Rounded'] leading-9">
        What’s your gender?
      </div>
      <div className="flex">
        <div className="w-[16rem] h-[20.6rem] px-[1rem] py-[1.2rem] bg-white rounded-[3rem] inline-flex flex-col justify-center items-center gap-[1rem]">
          <div className="w-[8rem] h-[8rem] bg-[#EA8273] rounded-full" />
          {/* <div className="w-[4rem] h-[4rem] relative overflow-hidden">
            <div className="w-[2.6rem] h-[1rem] absolute bg-white" />
          </div> */}
          <div className="text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Female
          </div>
        </div>
        <img src="/img/Union.svg" alt="" className="w-[18rem] h-[23rem]" />
      </div>
      <div className="mt-[9.6rem]" onClick={onClick}>
        {old ? (
          <img
            src="/img/arrow_right.min.png"
            alt=""
            className="w-[12rem] h-[12rem]"
          />
        ) : (
          <img
            src="/img/arrow_rightdis.min.png"
            alt=""
            className="w-[12rem] h-[12rem]"
          />
        )}
      </div>
    </div>
  );
};

export default Age;
