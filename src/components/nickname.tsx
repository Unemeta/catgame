/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { useRef, useEffect, useState } from "react";
import { useUserBasicInfo } from "@/store/info";
import { request } from "@/utils/request";

const NickName = ({ onClick }: iAnswerView) => {
  const inputref = useRef<HTMLInputElement>(null);
  const [basicInfo, setBasicInfo] = useUserBasicInfo();
  const [randomNames, setRandomNames] = useState<string[]>([]);
  const getNickName = async () => {
    const res = await request({
      url: "/api/cat/v1/survey/nicknames",
      method: "get",
    });
    const { femaleNames, maleNames } = res.data;
    const names = [...femaleNames, ...maleNames];
    setRandomNames(names);
  };
  useEffect(() => {
    inputref.current!.value = basicInfo.nickname;
  }, [basicInfo.nickname]);
  useEffect(() => {
    getNickName();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mt-[13rem]">
      <div className="text-center justify-start text-[#EA8373] text-[2.8rem] font-bold font-['SF_Pro_Rounded'] leading-9">
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
            className="w-[28rem] h-[3rem] text-[3rem] text-[#EA8373] placeholder:text-[#EA8373] outline-0
                     placeholder:font-['SF_Pro_Rounded']
                     placeholder:opacity-20"
            placeholder="Enter your nickname"
            value={basicInfo.nickname}
            onChange={(e) => {
              setBasicInfo({ ...basicInfo, nickname: e.target.value });
            }}
            ref={inputref}
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
          onClick={() => getNickName()}
        />
      </div>

      <div className="flex gap-[1rem] flex-wrap mt-[2rem] h-[17rem] overflow-auto">
        {randomNames.map((item) => {
          return (
            <div
              key={item}
              className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]"
              onClick={() => {
                if (inputref.current) {
                  setBasicInfo({ ...basicInfo, nickname: item });
                }
              }}
            >
              <div className="flex-1 text-center justify-start text-[#EA8273] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
                {item}
              </div>
            </div>
          );
        })}
        {/* <div
          className="w-[16.5rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem]"
          onClick={() => {
            if (inputref.current) {
              setBasicInfo({ ...basicInfo, nickname: "Abe" });
            }
          }}
        >
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
        </div> */}
      </div>
      <div className="mt-[6rem]">
        {basicInfo.nickname ? (
          <img
            src="/img/arrow_right.min.png"
            alt=""
            className="w-[12rem] h-[12rem]"
            onClick={onClick}
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
