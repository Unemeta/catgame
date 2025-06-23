/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import NickName from "@/components/nickname";
import Age from "@/components/age";
import Gender from "@/components/gender";
import ProgressBar from "@/components/progressbar";
import { cn } from "@/lib/utils";
import { useUserBasicInfo } from "@/store/info";
import { request } from "@/utils/request";
import { useRouter } from "next/router";
import DialogCheckIn from "@/components/dialog/checkIn";
// import DialogExchange from "@/components/dialog/exchange";

const InfoView = () => {
  const [stepIndex, setstepIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [basicInfo] = useUserBasicInfo();
  const router = useRouter();
  const postInfo = async () => {
    const res = await request({
      url: "/api/cat/v1/survey/survey/basic",
      method: "post",
      data: {
        ...basicInfo,
      },
    });
    console.log(res);
  };
  const getStep = async () => {
    const res = await request({
      url: "/api/cat/v1/survey/survey/step",
      method: "get",
    });
    const { step } = res.data;
    console.log(step);
    //0 代表未填写过基础信息
    //1 代表填写过基础信息，未填写过mbti
    //2 代表填写过基础信息和mbti
    // if (step === 1) {
    //   router.push("/question");
    // }
    // if (step === 2) {
    //   router.push("/chat");
    // }
  };

  useEffect(() => {
    getStep();
  }, []);

  return (
    <div className="w-full h-[100vh] absolute inset-0 z-[2] px-[2rem] bg-[url('/img/infoback.jpg')] bg-cover">
      {showQuestion ? (
        <>
          <div className="h-[3vh]"></div>
          <div className="w-full inline-flex justify-start items-center gap-1 space-x-[0.4rem]">
            <div
              className={cn("flex-1 h-[1.1vh] bg-red-300 rounded-[3rem]", {
                "bg-red-300": stepIndex === 0,
                "bg-red-300/20": stepIndex !== 0,
              })}
              onClick={() => {
                setstepIndex(0);
              }}
            />
            <div
              className={cn("flex-1 h-[1.1vh] rounded-[3rem]", {
                "bg-red-300": stepIndex === 1,
                "bg-red-300/20": stepIndex !== 1,
              })}
              onClick={() => {
                if (basicInfo.nickname) {
                  setstepIndex(1);
                }
              }}
            />
            <div
              className={cn("flex-1 h-[1.1vh] rounded-[3rem]", {
                "bg-red-300": stepIndex === 2,
                "bg-red-300/20": stepIndex !== 2,
              })}
              onClick={() => {
                if (basicInfo.age) {
                  setstepIndex(2);
                }
              }}
            />
          </div>
          {stepIndex === 0 && (
            <NickName
              onClick={() => {
                setstepIndex(1);
              }}
            ></NickName>
          )}
          {stepIndex === 1 && (
            <Age
              onClick={() => {
                setstepIndex(2);
              }}
            ></Age>
          )}
          {stepIndex === 2 && (
            <Gender
              onClick={async () => {
                try {
                  await postInfo();
                } catch (error) {
                  console.log(error);
                }
                router.push("/question");
              }}
            ></Gender>
          )}
        </>
      ) : (
        <ProgressBar
          setShow={() => {
            setShowQuestion(true);
          }}
        ></ProgressBar>
      )}
      <DialogCheckIn id={1}></DialogCheckIn>
    </div>
  );
};

export default InfoView;
