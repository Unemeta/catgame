/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { useRef, useEffect, useState } from "react";
import { useUserBasicInfo } from "@/store/info";
import { request } from "@/utils/request";
import { cn } from "@/lib/utils";

const NickName = ({ onClick }: iAnswerView) => {
  const inputref = useRef<HTMLInputElement>(null);
  const [basicInfo, setBasicInfo] = useUserBasicInfo();
  const [randomNames, setRandomNames] = useState<string[]>([]);
  const [namelist, setNameList] = useState<any[]>([]);
  const nameIndex = useRef(0);
  const getNickName = async () => {
    const res = await request({
      url: "/api/cat/v1/survey/nicknames",
      method: "get",
    });
    const { names } = res.data;
    setNameList(names);
    //首次
    if (names.length > 0) {
      const { male, female } = names[nameIndex.current];
      if (basicInfo.gender === 0) {
        setRandomNames([...male]);
      } else {
        setRandomNames([...female]);
      }
    }
    // setRandomNames(["aaa", "bbb", "ccc", "ddd"]);
  };
  // 刷新名字
  const refreshName = () => {
    if (nameIndex.current < 2) {
      nameIndex.current += 1;
    } else {
      nameIndex.current = 0;
    }
    const { male, female } = namelist[nameIndex.current];
    if (namelist.length > 0) {
      if (basicInfo.gender === 0) {
        setRandomNames([...male]);
      } else {
        setRandomNames([...female]);
      }
    }
  };

  useEffect(() => {
    inputref.current!.value = basicInfo.nickname;
  }, [basicInfo.nickname]);
  useEffect(() => {
    getNickName();
  }, []);
  return (
    <div className="flex flex-col items-center mt-[11rem] h-[58rem]">
      <div className="text-center justify-start text-[#EA8373] text-[2.4rem] font-[700] font-['SF_Pro_Rounded'] leading-9">
        What’s your nickname?
      </div>
      <div className="h-[36rem]">
        <div className="relative mt-[6rem]">
          <div
            className={cn(
              "w-[full] h-[5rem] bg-cover flex justify-center items-center"
              // {
              //   "bg-[url('/img/inormal.png')]": !basicInfo.nickname,
              //   "bg-[url('/img/ifocus.png')]": basicInfo.nickname,
              // }
            )}
          >
            {basicInfo.nickname ? (
              <img
                src="/img/ifocus.png"
                alt=""
                className="absolute -top-[0.5rem] left-0 w-full h-full -z-1"
              />
            ) : (
              <img
                src="/img/inormal.png"
                alt=""
                className="absolute -top-[0.5rem] left-0 w-full h-full -z-1"
              />
            )}

            <input
              type="text"
              className="w-[28rem] h-[2.4rem] text-[2.4rem] text-[#EA8373] placeholder:text-[#EA8373] outline-0 text-center
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
        <div className="flex justify-between w-[31rem] mt-[3rem]">
          <div className="text-center justify-start text-stone-500 text-[1.8rem] font-medium font-['SF_Pro_Rounded'] leading-snug">
            Or randomly select one
          </div>
          <img
            src="/img/refresh-name.svg"
            alt=""
            className="w-[2.4rem] h-[2.4rem]"
            onClick={() => refreshName()}
          />
        </div>
        <div className="flex gap-[1rem] flex-wrap mt-[2rem] overflow-auto justify-center py-[2rem]">
          {randomNames.map((item) => {
            return (
              <div
                key={item}
                className={cn(
                  "w-[15.2rem] px-[2rem] py-[1.3rem] rounded-[2rem] inline-flex justify-center items-center gap-[1rem]",
                  {
                    "bg-white": item !== basicInfo.nickname,
                    "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[20px]":
                      item === basicInfo.nickname,
                  }
                )}
                style={{
                  boxShadow:
                    item === basicInfo.nickname
                      ? "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E"
                      : "",
                }}
                onClick={() => {
                  if (inputref.current) {
                    setBasicInfo({ ...basicInfo, nickname: item });
                  }
                }}
              >
                <div
                  className={cn(
                    "flex-1 text-center justify-start text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                    {
                      "text-[#EA8273]": item !== basicInfo.nickname,
                      "text-white": item === basicInfo.nickname,
                    }
                  )}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[3rem]">
        {basicInfo.nickname ? (
          <img
            src="/img/arrow_right.min.png"
            alt=""
            className="w-[10rem] h-[10rem]"
            onClick={onClick}
          />
        ) : (
          <img
            src="/img/arrow_rightdis.min.png"
            alt=""
            className="w-[10rem] h-[10rem]"
          />
        )}
      </div>
    </div>
  );
};

export default NickName;
