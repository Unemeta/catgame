/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { useState } from "react";
const NickName = ({ onClick }: iAnswerView) => {
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col justify-center items-center mt-[18rem]">
      <div className="text-center justify-start text-[#EA8373] text-[3rem] font-bold font-['SF_Pro_Rounded'] leading-9">
        What’s your nickname?
      </div>

      <div className="relative mt-[6rem] w-full">
        <img
          src="/img/catInputIcon.svg"
          alt=""
          className="h-[7.5rem] w-[10.7rem] absolute left-[50%] top-[-1.6rem] -translate-x-[50%] -z-1"
        />
        <div className="w-full h-[7.6rem] bg-[white] rounded-[2rem] flex justify-center items-center">
          <input
            type="text"
            className="w-[28rem] h-[3rem] text-[3rem] text-[#EA8373] placeholder:text-[#EA8373]
                     placeholder:font-['SF_Pro_Rounded']
                     placeholder:opacity-20"
            placeholder="Enter your nickname"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-[3rem]">
        <div className="text-center justify-start text-stone-500 text-[1.8rem] font-medium font-['SF_Pro_Rounded'] leading-snug">
          Or randomly select one
        </div>
        <img
          src="/img/refresh-name.svg"
          alt=""
          className="w-[2.4rem] h-[2.4rem]"
        />
      </div>

      <div className="flex gap-[1rem] flex-wrap mt-[2rem]">
        <div className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]">
          <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Abe
          </div>
        </div>
        <div className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]">
          <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Abe
          </div>
        </div>
        <div className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]">
          <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Abe
          </div>
        </div>
        <div className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]">
          <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Abe
          </div>
        </div>
        <div className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]">
          <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Abe
          </div>
        </div>
        <div className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]">
          <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            Abe
          </div>
        </div>
      </div>
      <div className="mt-[9.6rem]" onClick={onClick}>
        {name ? (
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

export default NickName;
