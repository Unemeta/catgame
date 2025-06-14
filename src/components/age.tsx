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
        How old are you?
      </div>

      <div className="relative mt-[6rem] w-[33rem] h-[26rem] overflow-auto">
        <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]" onClick={()=>{setOld(1)}}>
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            1
          </div>
        </div>
        <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]">
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            2
          </div>
        </div>
        <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]">
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            3
          </div>
        </div>
        <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]">
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            4
          </div>
        </div>
         <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]">
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            5
          </div>
        </div>
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
