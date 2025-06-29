/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { useState } from "react";

interface iAnswerView {
  onClick: (selectIndexs: number[]) => void;
}
const AnswerView = ({ onClick }: iAnswerView) => {
  const [stepAnswerIndex, setstepAnswerIndex] = useState(0);
  const [selectIndexQuestionArr, setselectIndexQuestionArr] = useState([
    0, 0, 0, 0,
  ]);
  const [questionArr] = useState([
    {
      q: "At a party, <br /> you’re more likely to",
      a1: "Chat enthusiastically with lots of people and feel energized",
      a2: "Find a quiet corner to talk with close friends and soon feel like heading home",
    },
    {
      q: "When starting a new project, you tend to: ",
      a1: "Rely on past experiences and proceed step by step",
      a2: "Envision the big picture and possible future directions before diving into details",
    },
    {
      q: "When a friend shares their troubles, you usually",
      a1: "Help analyze the root of the problem and suggest solutions",
      a2: "Offer comfort first and express empathy and support",
    },
    {
      q: "When planning a trip, you prefer to 　　　　　　",
      a1: "Arrange the itinerary, hotels, and routes in advance to stay organized",
      a2: "Just book a flight and go, enjoying the freedom to explore spontaneously",
    },
  ]);
  return (
    <div className="w-full wrapHeight absolute inset-0 z-[2]">
      <div className="flex flex-col h-full">
        <div className="h-[3vh]"></div>
        <div className="flex justify-center items-center space-x-[0.4rem] px-[2rem]">
          <div
            className={cn("bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]", {
              "bg-white": stepAnswerIndex == 0,
            })}
          ></div>
          <div
            className={cn("bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]", {
              "bg-white": stepAnswerIndex == 1,
            })}
          ></div>
          <div
            className={cn("bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]", {
              "bg-white": stepAnswerIndex == 2,
            })}
          ></div>
          <div
            className={cn("bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]", {
              "bg-white": stepAnswerIndex == 3,
            })}
          ></div>
        </div>
        <div className="h-[5.5vh]"></div>
        <div
          className="text-[#fff] text-[2.4rem] font-[700] text-center leading-[1] mb-[0.5rem]"
          dangerouslySetInnerHTML={{
            __html: questionArr[stepAnswerIndex]["q"],
          }}
        ></div>
        <div className="h-[4vh]"></div>
        <div className="flex justify-center items-end">
          <div className="bg-[url('/img/cat_red.min.png')] w-[17.6rem] h-[17.6rem] bg-cover"></div>
        </div>
        <div className="h-[2.6vh]"></div>
        <div className="flex justify-center items-center mb-[2rem]">
          <div
            onClick={() => {
              const pre = [...selectIndexQuestionArr];
              pre[stepAnswerIndex] = 0;
              setselectIndexQuestionArr(pre);
            }}
            className={cn(
              "h-[7.6rem] w-[85vw] text-wrap rounded-[3.1rem] px-[2rem] py-[1.2rem] flex justify-center items-center bg-white/70",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)]  shadow-[0px,3px,4px,0px,rgba(255,255,255,0.25),0px,4px,24px,0px,#ECA89E] border-[#FF9A8B]F":
                  selectIndexQuestionArr[stepAnswerIndex] == 0,
              }
            )}
          >
            <div
              className={cn(
                "w-[3.6rem] h-[3.6rem] bg-[#826662]  rounded-[50%] flex justify-center items-center mr-[1rem]",
                {
                  "bg-white": selectIndexQuestionArr[stepAnswerIndex] == 0,
                }
              )}
            >
              <span
                className={cn("text-white text-[1.8rem] font-[700]", {
                  "text-[#D25A43]":
                    selectIndexQuestionArr[stepAnswerIndex] == 0,
                })}
              >
                A
              </span>
            </div>
            <span
              className={cn(
                "w-[24.7rem] text-[1.6rem] font-[700] leading-[1.2] text-[#826662]",
                {
                  "text-white": selectIndexQuestionArr[stepAnswerIndex] == 0,
                }
              )}
            >
              {questionArr[stepAnswerIndex]["a1"]}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            onClick={() => {
              const pre = [...selectIndexQuestionArr];
              pre[stepAnswerIndex] = 1;
              setselectIndexQuestionArr(pre);
            }}
            className={cn(
              "h-[7.6rem] w-[85vw] text-wrap bg-white/70 rounded-[3.1rem] blur--[1rem] px-[2rem] py-[1.2rem] flex justify-center items-center",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)]  shadow-[0px,3px,4px,0px,rgba(255,255,255,0.25),0px,4px,24px,0px,#ECA89E] border-[#FF9A8B]F":
                  selectIndexQuestionArr[stepAnswerIndex] == 1,
              }
            )}
          >
            <div
              className={cn(
                "w-[3.6rem] h-[3.6rem] bg-[#826662]  rounded-[50%] flex justify-center items-center mr-[1rem]",
                {
                  "bg-white": selectIndexQuestionArr[stepAnswerIndex] == 1,
                }
              )}
            >
              <span
                className={cn(" text-white text-[1.8rem] font-[700]", {
                  "text-[#D25A43]":
                    selectIndexQuestionArr[stepAnswerIndex] == 1,
                })}
              >
                B
              </span>
            </div>
            <span
              className={cn(
                "w-[24.7rem] text-[#826662] text-[1.6rem] font-[700] leading-[1.2]",
                {
                  "text-white": selectIndexQuestionArr[stepAnswerIndex] == 1,
                }
              )}
            >
              {questionArr[stepAnswerIndex]["a2"]}
            </span>
          </div>
        </div>
        {/* <div
          className="absolute bottom-[1rem] left-[50vw] translate-x-[-50%]"
          onClick={() => {
            if (stepAnswerIndex >= 3) {
              console.log(selectIndexQuestionArr);
              onClick(selectIndexQuestionArr);
            } else {
              setstepAnswerIndex((stepAnswerIndex) => stepAnswerIndex + 1);
            }
          }}
        > */}
        {/* opacity-50 */}
        <div className="flex justify-center items-center mt-[2rem]">
          <img
            src="/img/arrow_right.min.png"
            className="w-[27vw] h-[27vw] "
            alt=""
            onClick={() => {
              if (stepAnswerIndex >= 3) {
                console.log(selectIndexQuestionArr);
                onClick(selectIndexQuestionArr);
              } else {
                setstepAnswerIndex((stepAnswerIndex) => stepAnswerIndex + 1);
              }
            }}
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AnswerView;
