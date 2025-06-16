import AnswerView from "@/components/answer";
import Step3View from "@/components/step3";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { request } from "@/utils/request";

/* eslint-disable @next/next/no-img-element */
const PartyView = () => {
  const [stepIndex, setstepIndex] = useState(0);
  // const [payload, setpayload] = useState({
  // ei: 0,
  // sn: 0,
  // tf: 0,
  // jp: 0,
  // });
  const postInfo = async () => {
    try {
      const res = await request({
        url: "/api/cat/v1/survey/survey/mbti",
        method: "post",
        data: {
          ei: 0,
          sn: 0,
          tf: 0,
          jp: 0,
        },
      });
      setstepIndex(2);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="relative">
        <img
          className={cn("w-[100vw] h-[100vh] absolute inset-0 z-[1]", {
            "blur-[20px]": stepIndex !== 0,
          })}
          src="/img/bg/bg_pop_rain.min.png"
          alt=""
        />
        {stepIndex == 0 && (
          <div className="w-full h-[100vh] absolute inset-0 z-[2] text-center">
            <div className="flex flex-col h-full">
              <div className="h-[9.3vh]"></div>
              <div className="text-white text-[3rem] font-[700] mb-[3vh]">
                Soul Identification
              </div>
              <div className="text-center text-white text-[1.8rem] font-[500] leading-[1.1]">
                Meowster has prepared soul <br /> identification questions for
                you. <br /> Based on your answers, it will find a <br /> cat
                that matches you.
              </div>
              <div
                className="absolute bottom-[6vh] left-[50vw] ml-[-3.4rem]"
                onClick={() => {
                  setstepIndex(1);
                }}
              >
                <img
                  src="/img/arrow_right.min.png"
                  className="w-[6.9rem] h-[6.9rem]"
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
        {stepIndex == 1 && (
          <AnswerView
            onClick={() => {
              postInfo();
              // setstepIndex(2);
            }}
          ></AnswerView>
        )}
        {stepIndex == 2 && <Step3View></Step3View>}
      </div>
    </div>
  );
};

export default PartyView;
