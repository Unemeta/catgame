import { cn } from "@/lib/utils";
import { useState } from "react";

interface iAnswerView {
  onClick: VoidFunction;
}
const AnswerView = ({ onClick }: iAnswerView) => {
  const [selectIndexQuestion, setselectIndexQuestion] = useState(0);
  return (
    <div className="w-full h-[100vh] absolute inset-0 z-[2]">
      <div className="flex flex-col h-full">
        <div className="h-[3vh]"></div>
        <div className="flex justify-center items-center space-x-[0.4rem] px-[2rem]">
          <div className="bg-white rounded-[3rem] flex-1 h-[1.1vh]"></div>
          <div className="bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]"></div>
          <div className="bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]"></div>
        </div>
        <div className="h-[5.5vh]"></div>
        <div className="text-[#fff] text-[3rem] font-[700] text-center leading-[1] mb-[0.5rem]">
          At a party,
        </div>
        <div className="text-[#fff] text-[2rem] font-[700] text-center leading-[1]">
          you’re more likely to
        </div>
        <div className="h-[4vh]"></div>
        <div className="flex justify-center items-end">
          <div className="bg-[url('/img/cat_red.min.png')] w-[28.4rem] h-[28.4rem] bg-cover"></div>
        </div>
        <div className="h-[2.6vh]"></div>
        <div className="flex justify-center items-center mb-[2rem]">
          <div
            onClick={() => {
              setselectIndexQuestion(0);
            }}
            className={cn(
              "   rounded-[3.1rem] px-[2rem] py-[1.2rem] flex justify-center items-center bg-white/70",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)]  shadow-[0px,3px,4px,0px,rgba(255,255,255,0.25),0px,4px,24px,0px,#ECA89E] border-[#FF9A8B]F":
                  selectIndexQuestion == 0,
              }
            )}
          >
            <div
              className={cn(
                "w-[3.6rem] h-[3.6rem] bg-[#826662]  rounded-[50%] flex justify-center items-center mr-[1rem]",
                {
                  "bg-white": selectIndexQuestion == 0,
                }
              )}
            >
              <span
                className={cn("text-white text-[1.8rem] font-[700]", {
                  "text-[#D25A43]": selectIndexQuestion == 0,
                })}
              >
                A
              </span>
            </div>
            <span
              className={cn(" text-[1.8rem] font-[700] leading-[1.2]", {
                "text-white": selectIndexQuestion == 0,
              })}
            >
              {" "}
              Chat enthusiastically with lots <br /> of people and feel
              energized
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            onClick={() => {
              setselectIndexQuestion(1);
            }}
            className={cn(
              "bg-white/70 rounded-[3.1rem] blur--[1rem] px-[2rem] py-[1.2rem] flex justify-center items-center",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)]  shadow-[0px,3px,4px,0px,rgba(255,255,255,0.25),0px,4px,24px,0px,#ECA89E] border-[#FF9A8B]F":
                  selectIndexQuestion == 1,
              }
            )}
          >
            <div
              className={cn(
                "w-[3.6rem] h-[3.6rem] bg-[#826662]  rounded-[50%] flex justify-center items-center mr-[1rem]",
                {
                  "bg-white": selectIndexQuestion == 1,
                }
              )}
            >
              <span
                className={cn("text-white text-[1.8rem] font-[700]", {
                  "text-[#D25A43]": selectIndexQuestion == 1,
                })}
              >
                B
              </span>
            </div>
            <span
              className={cn(
                "text-[#826662] text-[1.8rem] font-[700] leading-[1.2]",
                {
                  "text-white": selectIndexQuestion == 1,
                }
              )}
            >
              Find a quiet corner to talk with <br /> close friends and soon
              feel <br />
              like heading home
            </span>
          </div>
        </div>
        <div
          className="absolute bottom-[6vh] left-[50vw] ml-[-3.4rem]"
          onClick={onClick}
        >
          <img
            src="/img/arrow_right.min.png"
            className="w-[6.9rem] h-[6.9rem] opacity-50"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerView;
